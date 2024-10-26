import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required]],
    });
  }

  async onSignup() {
    console.log('Signup form:', this.signupForm.value);
    try {
      await this.authService.signup(this.signupForm.value.email, this.signupForm.value.password);
      this.router.navigate(['/dashboard']); // Navigate to dashboard on success
    } catch (error) {
      console.error('Signup error:', error);
    }
  }
}


