import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../shared/services/user';

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

  constructor(private router: Router, private userService: UserService, private cdr: ChangeDetectorRef) {}

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

    this.userService.login({
      email: this.form.email.trim().toLowerCase(),
      password: this.form.password,
    }).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.isNotValid) {
          this.errorMsg = res.message;
          this.cdr.markForCheck();
          return;
        }
        localStorage.setItem('uc_token', res.token);
        localStorage.setItem('uc_user', JSON.stringify({
          userId: res.userId, fullName: res.fullName, email: res.email,
          company: res.company, roleId: res.roleId,
        }));
        this.router.navigate(['/dashboard']);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.errorMsg = err.error?.message ?? 'Invalid credentials. Please try again.';
        this.cdr.markForCheck();
      },
    });
  }
}
