import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Employee {
  id:         number;
  name:       string;
  initials:   string;
  title:      string;
  department: string;
  email:      string;
  status:     'Active' | 'On Leave' | 'Inactive';
  joinDate:   string;
}

@Component({
  selector: 'app-employees',
  imports: [FormsModule],
  templateUrl: './employees.html',
  styleUrl:    './employees.scss',
})
export class Employees {
  searchTerm = '';
  selectedDept = 'All';

  departments = ['All', 'Engineering', 'Sales', 'HR', 'Finance', 'Operations'];

  stats = [
    { icon: '👥', label: 'Total Employees', value: '128', color: '#7C6FFF' },
    { icon: '✅', label: 'Active',           value: '119', color: '#68d391' },
    { icon: '🌴', label: 'On Leave',         value: '6',   color: '#f6ad55' },
    { icon: '🆕', label: 'New Hires (30d)',  value: '5',   color: '#4fc3f7' },
  ];

  employees: Employee[] = [
    { id: 1, name: 'Ananya Rao',     initials: 'AR', title: 'Senior Software Engineer', department: 'Engineering', email: 'ananya.rao@uc.dev',     status: 'Active',   joinDate: '2023-02-14' },
    { id: 2, name: 'Vikram Shah',    initials: 'VS', title: 'Sales Manager',            department: 'Sales',       email: 'vikram.shah@uc.dev',    status: 'Active',   joinDate: '2021-07-01' },
    { id: 3, name: 'Priya Menon',    initials: 'PM', title: 'HR Business Partner',      department: 'HR',         email: 'priya.menon@uc.dev',    status: 'On Leave', joinDate: '2022-11-20' },
    { id: 4, name: 'Karthik Iyer',   initials: 'KI', title: 'Financial Analyst',         department: 'Finance',    email: 'karthik.iyer@uc.dev',   status: 'Active',   joinDate: '2024-01-09' },
    { id: 5, name: 'Sneha Gupta',    initials: 'SG', title: 'Operations Lead',           department: 'Operations', email: 'sneha.gupta@uc.dev',    status: 'Active',   joinDate: '2020-05-18' },
    { id: 6, name: 'Rahul Verma',    initials: 'RV', title: 'Frontend Developer',        department: 'Engineering', email: 'rahul.verma@uc.dev',   status: 'Active',   joinDate: '2026-05-10' },
    { id: 7, name: 'Divya Nair',     initials: 'DN', title: 'Account Executive',         department: 'Sales',       email: 'divya.nair@uc.dev',    status: 'Inactive', joinDate: '2019-09-03' },
    { id: 8, name: 'Arjun Mehta',    initials: 'AM', title: 'Recruiter',                 department: 'HR',         email: 'arjun.mehta@uc.dev',    status: 'Active',   joinDate: '2026-06-02' },
  ];

  get filteredEmployees(): Employee[] {
    return this.employees.filter(e => {
      const matchesDept   = this.selectedDept === 'All' || e.department === this.selectedDept;
      const matchesSearch = !this.searchTerm ||
        e.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        e.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesDept && matchesSearch;
    });
  }

  getStatusBadge(status: Employee['status']): string {
    return { Active: '✅ Active', 'On Leave': '🌴 On Leave', Inactive: '⛔ Inactive' }[status];
  }

  getStatusClass(status: Employee['status']): string {
    return { Active: 'active', 'On Leave': 'on-leave', Inactive: 'inactive' }[status];
  }
}
