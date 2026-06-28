import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  sidebarOpen = true;
  pageTitle   = 'Dashboard';
  userName    = 'Vishnu';

  navItems = [
    { icon: '👥', label: 'Employees',   route: '/dashboard/employees'  },
    { icon: '🎯', label: 'Recruitment', route: '/dashboard/recruitment'},
    { icon: '💰', label: 'Payroll',     route: '/dashboard/payroll'    },
    { icon: '📊', label: 'Reports',     route: '/dashboard/reports'    },
    { icon: '📄', label: 'Documents',   route: '/dashboard/upload'     },
    { icon: '🤖', label: 'AI Agents',   route: '/dashboard/agents'     },
  ];

  pinnedItems = [
    { icon: '📌', label: 'HR Candidate Search', route: '/dashboard' },
    { icon: '📌', label: 'Payroll Q1 2026',     route: '/dashboard' },
  ];

  recentSessions = [
    'Search Java Developers',
    'Payroll Report Q1 2026',
    'New Employee Onboarding',
    'Leave Policy Update',
    'Interview Schedule May',
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // set page title from URL
    this.updateTitle(this.router.url);
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => this.updateTitle(e.urlAfterRedirects));
  }

  private updateTitle(url: string) {
    if      (url.includes('/upload'))      this.pageTitle = 'Upload Documents';
    else if (url.includes('/employees'))   this.pageTitle = 'Employees';
    else if (url.includes('/recruitment')) this.pageTitle = 'Recruitment';
    else if (url.includes('/payroll'))     this.pageTitle = 'Payroll';
    else if (url.includes('/reports'))     this.pageTitle = 'Reports';
    else if (url.includes('/agents'))      this.pageTitle = 'AI Agents';
    else                                   this.pageTitle = 'Dashboard';
  }

  toggleSidebar() { this.sidebarOpen = !this.sidebarOpen; }

  logout() { this.router.navigate(['/login']); }
}
