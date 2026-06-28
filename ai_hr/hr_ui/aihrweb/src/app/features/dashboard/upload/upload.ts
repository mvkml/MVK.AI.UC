import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface UploadFile {
  id:       number;
  name:     string;
  size:     string;
  ext:      string;
  docType:  string;
  status:   'pending' | 'uploading' | 'done' | 'error';
  progress: number;
}

@Component({
  selector: 'app-upload',
  imports: [FormsModule],
  templateUrl: './upload.html',
  styleUrl:    './upload.scss',
})
export class Upload {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  isDragging = false;
  selectedDocType = 'Resume';
  private idCounter = 1;

  docTypes = ['Resume', 'Job Description', 'Policy', 'Contract', 'Offer Letter', 'Appraisal', 'Other'];

  stats = [
    { icon: '📁', label: 'Total Docs',   value: '24', color: '#7C6FFF' },
    { icon: '📄', label: 'Resumes',      value: '12', color: '#4fc3f7' },
    { icon: '📋', label: 'Policies',     value: '6',  color: '#68d391' },
    { icon: '✅', label: 'AI Indexed',   value: '22', color: '#f6ad55' },
  ];

  files: UploadFile[] = [];

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
    const allowed = ['pdf', 'doc', 'docx', 'txt', 'png', 'jpg'];
    raw.forEach(f => {
      const ext = f.name.split('.').pop()?.toLowerCase() ?? '';
      if (!allowed.includes(ext)) return;

      const entry: UploadFile = {
        id:       this.idCounter++,
        name:     f.name,
        size:     this.formatSize(f.size),
        ext,
        docType:  this.selectedDocType,
        status:   'pending',
        progress: 0,
      };
      this.files.unshift(entry);
      this.simulateUpload(entry);
    });
  }

  private simulateUpload(entry: UploadFile) {
    setTimeout(() => {
      entry.status = 'uploading';
      const iv = setInterval(() => {
        entry.progress = Math.min(entry.progress + Math.random() * 18 + 6, 100);
        if (entry.progress >= 100) {
          entry.progress = 100;
          entry.status   = Math.random() > 0.08 ? 'done' : 'error';
          clearInterval(iv);
        }
      }, 160);
    }, 300 + Math.random() * 400);
  }

  removeFile(id: number) { this.files = this.files.filter(f => f.id !== id); }

  retryFile(entry: UploadFile) {
    entry.status   = 'pending';
    entry.progress = 0;
    this.simulateUpload(entry);
  }

  getExtIcon(ext: string): string {
    const map: Record<string, string> = {
      pdf: '📕', doc: '📘', docx: '📘', txt: '📃', png: '🖼️', jpg: '🖼️',
    };
    return map[ext] ?? '📄';
  }

  getStatusBadge(status: string): string {
    return { pending: '⏳ Pending', uploading: '⬆️ Uploading', done: '✅ Done', error: '❌ Failed' }[status] ?? '';
  }

  private formatSize(bytes: number): string {
    if (bytes < 1024)       return bytes + ' B';
    if (bytes < 1048576)    return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }
}
