import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required]],
    });
  }

  // login.component.ts
  async onLogin() {
    try {
      const success = await this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      );

      // Navigate to dashboard only if login was successful
      if (success) {
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }
}


