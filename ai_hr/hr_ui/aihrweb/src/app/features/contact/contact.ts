import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [Navbar, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  contactInfo = [
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'Vishnu Kiran',
      link: 'https://www.linkedin.com/in/vishnu-kiran-88402063/',
      display: 'linkedin.com/in/vishnu-kiran'
    },
    {
      icon: '🐙',
      label: 'GitHub',
      value: 'mvkml',
      link: 'https://github.com/mvkml',
      display: 'github.com/mvkml'
    },
    {
      icon: '🤖',
      label: 'UC Copilot',
      value: 'Ask UC Anything',
      link: '#',
      display: 'Your Intelligent HR Partner'
    },
  ];

  form = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  submitted = false;

  onSubmit() {
    this.submitted = true;
    setTimeout(() => this.submitted = false, 4000);
    this.form = { name: '', email: '', subject: '', message: '' };
  }
}
