import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-about',
  imports: [Navbar],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  techStack = [
    { icon: '⚡', name: 'Angular 21', desc: 'SSR + CSR Hybrid Frontend' },
    { icon: '🚀', name: 'FastAPI', desc: 'High Performance Python Backend' },
    { icon: '🔍', name: 'Azure AI Search', desc: 'Intelligent HR Document Search' },
    { icon: '☁️', name: 'Azure Storage', desc: 'Enterprise Document Storage' },
    { icon: '📊', name: 'Graphify', desc: 'Advanced Graph Visualization' },
    { icon: '🤖', name: 'Claude AI', desc: 'AI-Powered Smart Agents' },
  ];

  team = [
    { icon: '🏗️', name: 'Architect Agent', role: 'System Design & Architecture' },
    { icon: '📦', name: 'Product Owner Agent', role: 'Product Vision & Backlog' },
    { icon: '🏃', name: 'Scrum Master Agent', role: 'Delivery & Sprint Management' },
    { icon: '⚡', name: 'Dev Angular Agent', role: 'Frontend UI Development' },
    { icon: '🗄️', name: 'Dev SQL Agent', role: 'Database Design & Management' },
    { icon: '🚀', name: 'Dev FastAPI Agent', role: 'Backend API Development' },
    { icon: '🔧', name: 'Dev DevOps Agent', role: 'Infrastructure & CI/CD' },
  ];

  capabilities = [
    { icon: '🔍', title: 'Smart Search', desc: 'Find the right HR information in seconds using Azure AI Search.' },
    { icon: '📊', title: 'Deep Insights', desc: 'Get meaningful HR analysis, trends and recommendations.' },
    { icon: '📄', title: 'Accurate Results', desc: 'AI-powered accuracy you can trust for every HR decision.' },
    { icon: '🔒', title: 'Secure & Private', desc: 'Your HR data is protected with enterprise-grade security.' },
  ];
}
