import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleItem, UserService } from '../../shared/services/user';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup implements OnInit {
  form = {
    fullName: '',
    email: '',
    company: '',
    roleId: 0,
    password: '',
    confirmPassword: ''
  };

  roles: RoleItem[] = [];

  showPassword        = false;
  showConfirmPassword = false;
  isLoading           = false;
  errorMsg            = '';
  successMsg          = '';

  step = 1; // 2-step form

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getRoles().subscribe({
      next: (res) => {
        this.roles = res.roleItems.sort((a, b) => a.orderId - b.orderId);
      },
      error: () => {
        this.errorMsg = 'Could not load roles. Is the API running?';
      },
    });
  }

  nextStep() {
    if (!this.form.fullName || !this.form.email || !this.form.company || !this.form.roleId) {
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
    this.userService.signUp({
      fullName: this.form.fullName,
      email: this.form.email,
      company: this.form.company,
      password: this.form.password,
      roleId: this.form.roleId,
    }).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.isNotValid) {
          this.errorMsg = res.message;
          return;
        }
        this.successMsg = '🎉 Account created! Welcome to UC — Your Copilot.';
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.errorMsg = err.error?.message ?? 'Sign up failed. Please try again.';
      },
    });
  }

  getPasswordStrength(): { label: string; color: string; width: string } {
    const p = this.form.password;
    if (!p) return { label: '', color: 'transparent', width: '0%' };
    if (p.length < 6)  return { label: 'Weak',   color: '#fc8181', width: '33%' };
    if (p.length < 10) return { label: 'Medium', color: '#f6ad55', width: '66%' };
    return { label: 'Strong', color: '#68d391', width: '100%' };
  }
}
