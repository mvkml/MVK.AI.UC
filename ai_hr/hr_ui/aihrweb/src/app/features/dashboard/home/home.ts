import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Message { role: 'user' | 'ai'; text: string; }

const MOCK_AI = [
  '🔍 Searching HR database... Found **12 matching candidates**. Would you like to filter by experience or location?',
  '📊 Q1 2026 payroll summary: ₹24.5L disbursed across 45 employees. Shall I export this as PDF?',
  '👥 Found **8 Java developers** in the talent pool. Top match: Ravi Kumar — 6 yrs experience, available immediately.',
  '📄 Document uploaded and indexed. Key policy points extracted and added to the HR knowledge base.',
  '🤖 Based on HR patterns, I recommend scheduling interviews for the top 3 shortlisted candidates this week.',
  '💰 Payroll processed for May 2026. All employees credited. **2 pending approvals** require your attention.',
  '📋 Leave policy updated. Applies from June 1 2026. Notification sent to all team leads.',
];
let mockIdx = 0;

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewChecked {
  @ViewChild('messagesArea') messagesArea!: ElementRef<HTMLDivElement>;

  prompt    = '';
  isTyping  = false;
  messages: Message[] = [];
  private shouldScroll = false;

  quickActions = [
    { icon: '🔍', label: 'Search Candidates', desc: 'Find the right talent',  prompt: 'Search for Java developers with 5+ years experience' },
    { icon: '📊', label: 'Generate Report',   desc: 'Analytics & insights',   prompt: 'Generate payroll report for Q1 2026'                  },
    { icon: '📄', label: 'Upload Document',   desc: 'HR docs & policies',     route:  '/dashboard/upload'                                    },
    { icon: '🤖', label: 'Ask AI Agent',      desc: 'Let UC handle it',       prompt: 'What are the top 3 candidates for the React role?'    },
  ];

  constructor(private router: Router) {}

  ngAfterViewChecked() {
    if (this.shouldScroll) { this.scrollToBottom(); this.shouldScroll = false; }
  }

  clickQuickAction(action: any) {
    if (action.route) { this.router.navigate([action.route]); return; }
    this.prompt = action.prompt;
    this.onSend();
  }

  onSend() {
    const text = this.prompt.trim();
    if (!text) return;
    this.messages.push({ role: 'user', text });
    this.prompt = ''; this.isTyping = true; this.shouldScroll = true;

    setTimeout(() => {
      this.isTyping = false;
      this.messages.push({ role: 'ai', text: MOCK_AI[mockIdx++ % MOCK_AI.length] });
      this.shouldScroll = true;
    }, 1000 + Math.random() * 700);
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.onSend(); }
  }

  private scrollToBottom() {
    try { const el = this.messagesArea?.nativeElement; if (el) el.scrollTop = el.scrollHeight; } catch {}
  }
}
