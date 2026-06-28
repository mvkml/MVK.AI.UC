import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

// ── Mock credentials ──────────────────────────────────────────────
const MOCK_USERS = [
  { email: 'admin@uc.ai',   password: 'Admin@123',  name: 'Vishnu Kiran' },
  { email: 'hr@uc.ai',      password: 'HR@1234',    name: 'HR Manager'   },
  { email: 'demo@uc.ai',    password: 'Demo@123',   name: 'Demo User'    },
];

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  form = {
    email: '',
    password: ''
  };

  showPassword = false;
  isLoading    = false;
  errorMsg     = '';

  constructor(private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.errorMsg = '';
    if (!this.form.email || !this.form.password) {
      this.errorMsg = 'Please enter your email and password.';
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;

      const user = MOCK_USERS.find(
        u => u.email === this.form.email.trim().toLowerCase()
          && u.password === this.form.password
      );

      if (user) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMsg = 'Invalid credentials. Please try again.';
      }
    }, 1200);
  }
}
