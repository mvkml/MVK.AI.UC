import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-portfolio',
  imports: [Navbar],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio {
  stats = [
    { value: '7+',   label: 'AI Agents'        },
    { value: '3+',   label: 'Pages Delivered'   },
    { value: '100%', label: 'AI Powered'        },
    { value: '∞',    label: 'Scalability'       },
  ];

  projects = [
    {
      icon: '🏠', title: 'UC Landing Page',
      desc: 'AI-themed landing page with animated robot mascot, dark navy design, and smooth navigation.',
      tags: ['Angular 21', 'SSR', 'SCSS', 'Animation'],
      status: '✅ Live'
    },
    {
      icon: 'ℹ️', title: 'UC About Page',
      desc: 'Comprehensive about page showcasing capabilities, technology stack, mission, and team agents.',
      tags: ['Angular 21', 'SSR', 'Data Driven', 'SCSS'],
      status: '✅ Live'
    },
    {
      icon: '🛠️', title: 'UC Our Service Page',
      desc: 'Service showcase with 6 core HR services, 3-step process, and benefit highlights.',
      tags: ['Angular 21', 'SSR', 'Grid Layout'],
      status: '✅ Live'
    },
    {
      icon: '🔍', title: 'HR Document Search',
      desc: 'Intelligent HR document search powered by Azure AI Search with instant results.',
      tags: ['Azure AI Search', 'FastAPI', 'Angular'],
      status: '🔄 Planned'
    },
    {
      icon: '📊', title: 'HR Analytics Dashboard',
      desc: 'Graph-based HR analytics and insights powered by Graphify visualization engine.',
      tags: ['Graphify', 'FastAPI', 'Angular CSR'],
      status: '🔄 Planned'
    },
    {
      icon: '👥', title: 'Employee Management',
      desc: 'Full employee lifecycle management — from onboarding to offboarding.',
      tags: ['FastAPI', 'SQL', 'Angular CSR'],
      status: '🔄 Planned'
    },
  ];

  techBadges = [
    'Angular 21', 'FastAPI', 'Python', 'Azure AI Search',
    'Azure Storage', 'Graphify', 'Claude AI', 'TypeScript',
    'SCSS', 'SSR', 'REST API', 'SQL'
  ];
}
