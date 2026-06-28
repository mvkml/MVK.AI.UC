import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  form = {
    fullName: '',
    email: '',
    company: '',
    role: '',
    password: '',
    confirmPassword: ''
  };

  roles = [
    'HR Manager',
    'HR Executive',
    'Recruiter',
    'Payroll Manager',
    'Team Lead',
    'Developer',
    'Other'
  ];

  showPassword        = false;
  showConfirmPassword = false;
  isLoading           = false;
  errorMsg            = '';
  successMsg          = '';

  step = 1; // 2-step form

  nextStep() {
    if (!this.form.fullName || !this.form.email || !this.form.company) {
      this.errorMsg = 'Please fill in all fields.';
      return;
    }
    this.errorMsg = '';
    this.step = 2;
  }

  prevStep() {
    this.step = 1;
    this.errorMsg = '';
  }

  onSubmit() {
    this.errorMsg = '';
    if (!this.form.password || !this.form.confirmPassword) {
      this.errorMsg = 'Please fill in all fields.';
      return;
    }
    if (this.form.password !== this.form.confirmPassword) {
      this.errorMsg = 'Passwords do not match.';
      return;
    }
    if (this.form.password.length < 8) {
      this.errorMsg = 'Password must be at least 8 characters.';
      return;
    }
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.successMsg = '🎉 Account created! Welcome to UC — Your Copilot.';
    }, 1500);
  }

  getPasswordStrength(): { label: string; color: string; width: string } {
    const p = this.form.password;
    if (!p) return { label: '', color: 'transparent', width: '0%' };
    if (p.length < 6)  return { label: 'Weak',   color: '#fc8181', width: '33%' };
    if (p.length < 10) return { label: 'Medium', color: '#f6ad55', width: '66%' };
    return { label: 'Strong', color: '#68d391', width: '100%' };
  }
}
