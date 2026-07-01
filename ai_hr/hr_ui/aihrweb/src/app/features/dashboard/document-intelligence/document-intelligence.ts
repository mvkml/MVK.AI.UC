import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ExtractedField {
  label: string;
  value: string;
}

interface OcrFile {
  id:        number;
  name:      string;
  size:      string;
  ext:       string;
  docType:   string;
  status:    'pending' | 'processing' | 'extracted' | 'submitted' | 'error';
  progress:  number;
  fields:    ExtractedField[];
}

interface DocTypeDef {
  label:  string;
  icon:   string;
  fields: string[];
}

@Component({
  selector: 'app-document-intelligence',
  imports: [FormsModule],
  templateUrl: './document-intelligence.html',
  styleUrl:    './document-intelligence.scss',
})
export class DocumentIntelligence {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  isDragging = false;
  private idCounter = 1;

  docTypes: Record<string, DocTypeDef> = {
    'PAN Card':           { icon: '🪪', label: 'PAN Card',           fields: ['PAN Number', 'Name', "Father's Name", 'Date of Birth'] },
    'Aadhaar Card':       { icon: '🆔', label: 'Aadhaar Card',       fields: ['Aadhaar Number', 'Name', 'Date of Birth', 'Gender', 'Address'] },
    'Driving Licence':    { icon: '🚗', label: 'Driving Licence',    fields: ['DL Number', 'Name', 'Date of Birth', 'Valid Until', 'Vehicle Class'] },
    'Form 16':            { icon: '📄', label: 'Form 16',            fields: ['PAN', 'Employer Name', 'Assessment Year', 'Gross Salary', 'TDS Deducted'] },
    'EPF Card':           { icon: '💼', label: 'EPF Card',           fields: ['UAN Number', 'Member Name', 'Establishment Name', 'PF Number'] },
  };

  selectedDocType = 'PAN Card';

  get docTypeKeys(): string[] {
    return Object.keys(this.docTypes);
  }

  stats = [
    { icon: '📑', label: 'Total Processed', value: '18', color: '#7C6FFF' },
    { icon: '⏳', label: 'Pending Review',  value: '3',  color: '#f6ad55' },
    { icon: '🔎', label: 'Fields Extracted', value: '94', color: '#4fc3f7' },
    { icon: '🎯', label: 'Accuracy',         value: '97%', color: '#68d391' },
  ];

  files: OcrFile[] = [];
  expandedFileId: number | null = null;

  get extractedCount(): number {
    return this.files.filter(f => f.status === 'extracted').length;
  }

  batchWarning: string | null = null;
  private warningTimer: ReturnType<typeof setTimeout> | null = null;

  private showWarning(msg: string) {
    this.batchWarning = msg;
    if (this.warningTimer) clearTimeout(this.warningTimer);
    this.warningTimer = setTimeout(() => this.batchWarning = null, 3000);
  }

  // ── Drag & Drop ──
  onDragOver(e: DragEvent) { e.preventDefault(); this.isDragging = true; }
  onDragLeave()            { this.isDragging = false; }

  onDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragging = false;
    const droppedFiles = Array.from(e.dataTransfer?.files ?? []);
    this.addFiles(droppedFiles);
  }

  openFileDialog()     { this.fileInput.nativeElement.click(); }

  onFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    const selected = Array.from(input.files ?? []);
    this.addFiles(selected);
    input.value = '';
  }

  private addFiles(raw: File[]) {
    const allowed = ['pdf', 'png', 'jpg', 'jpeg'];
    raw.forEach(f => {
      const ext = f.name.split('.').pop()?.toLowerCase() ?? '';
      if (!allowed.includes(ext)) return;

      const entry: OcrFile = {
        id:       this.idCounter++,
        name:     f.name,
        size:     this.formatSize(f.size),
        ext,
        docType:  this.selectedDocType,
        status:   'pending',
        progress: 0,
        fields:   [],
      };
      this.files.unshift(entry);
      this.simulateOcr(entry);
    });
  }

  private simulateOcr(entry: OcrFile) {
    setTimeout(() => {
      entry.status = 'processing';
      const iv = setInterval(() => {
        entry.progress = Math.min(entry.progress + Math.random() * 16 + 6, 100);
        if (entry.progress >= 100) {
          entry.progress = 100;
          const success = Math.random() > 0.08;
          entry.status = success ? 'extracted' : 'error';
          if (success) entry.fields = this.mockFields(entry.docType);
          clearInterval(iv);
        }
      }, 180);
    }, 300 + Math.random() * 400);
  }

  private mockFields(docType: string): ExtractedField[] {
    const def = this.docTypes[docType];
    return def.fields.map(label => ({ label, value: '—' }));
  }

  retryFile(entry: OcrFile) {
    entry.status   = 'pending';
    entry.progress = 0;
    entry.fields   = [];
    this.simulateOcr(entry);
  }

  removeFile(id: number) {
    this.files = this.files.filter(f => f.id !== id);
    if (this.expandedFileId === id) this.expandedFileId = null;
  }

  toggleExpand(id: number) {
    this.expandedFileId = this.expandedFileId === id ? null : id;
  }

  // ── Submit / Cancel extracted data (UI only — REST API wiring comes later) ──
  submitFields(file: OcrFile) {
    file.status = 'submitted';
    this.expandedFileId = null;
  }

  cancelFields(id: number) {
    this.removeFile(id);
  }

  submitAll() {
    if (this.extractedCount === 0) {
      this.showWarning('⚠️ Please upload a document before submitting.');
      return;
    }
    this.files.filter(f => f.status === 'extracted').forEach(f => f.status = 'submitted');
    this.expandedFileId = null;
  }

  cancelAll() {
    if (this.extractedCount === 0) {
      this.showWarning('⚠️ Please upload a document first — nothing to cancel.');
      return;
    }
    this.files = this.files.filter(f => f.status !== 'extracted');
    this.expandedFileId = null;
  }

  getExtIcon(ext: string): string {
    const map: Record<string, string> = { pdf: '📕', png: '🖼️', jpg: '🖼️', jpeg: '🖼️' };
    return map[ext] ?? '📄';
  }

  getStatusBadge(status: string): string {
    return { pending: '⏳ Pending', processing: '🔄 Processing', extracted: '✅ Extracted', submitted: '📨 Submitted', error: '❌ Failed' }[status] ?? '';
  }

  private formatSize(bytes: number): string {
    if (bytes < 1024)    return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }
}
