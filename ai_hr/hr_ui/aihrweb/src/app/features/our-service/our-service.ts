import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-our-service',
  imports: [Navbar],
  templateUrl: './our-service.html',
  styleUrl: './our-service.scss',
})
export class OurService {
  services = [
    { icon: '🔍', title: 'HR Document Search', desc: 'Instantly search and retrieve HR documents using Azure AI Search with intelligent ranking and relevance scoring.' },
    { icon: '🤖', title: 'AI HR Assistant', desc: 'Ask UC anything — get instant, accurate answers about HR policies, employee data, and compliance.' },
    { icon: '👥', title: 'Employee Management', desc: 'Manage employee records, profiles, roles, and history in one centralized intelligent platform.' },
    { icon: '💰', title: 'Payroll Management', desc: 'Automate payroll processing with AI-powered accuracy, tax calculations, and compliance checks.' },
    { icon: '📊', title: 'HR Analytics & Insights', desc: 'Graph-based HR analytics powered by Graphify — visualize trends, patterns and workforce insights.' },
    { icon: '🔒', title: 'Compliance & Security', desc: 'Enterprise-grade security with Azure infrastructure, role-based access, and audit trails.' },
  ];

  steps = [
    { step: '01', title: 'Connect Your Data', desc: 'Upload your HR documents to Azure Storage. UC indexes everything automatically via Azure AI Search.' },
    { step: '02', title: 'Ask UC Anything', desc: 'Use natural language to search, query, and get instant insights from your HR data.' },
    { step: '03', title: 'Act on Insights', desc: 'Make data-driven HR decisions backed by AI precision, graph analytics, and real-time data.' },
  ];

  benefits = [
    { icon: '⚡', title: 'Fast & Accurate', desc: 'AI-powered search returns results in milliseconds with high accuracy.' },
    { icon: '🌐', title: 'Cloud Native', desc: 'Built on Azure — scalable, reliable and enterprise ready.' },
    { icon: '🔄', title: 'Always Updated', desc: 'Real-time data sync keeps your HR information current.' },
    { icon: '🎯', title: 'Purpose Built', desc: 'Designed specifically for HR workflows and challenges.' },
  ];
}
