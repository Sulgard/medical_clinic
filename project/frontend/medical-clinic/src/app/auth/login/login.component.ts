import { AuthRequestDTO } from './../../api/rest-api';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MaterialModule, 
    ReactiveFormsModule,
    CommonModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const authRequest: AuthRequestDTO = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      this.authService.login(authRequest).subscribe({
        next: () => this.authService.redirectToDashboard()
      });
      console.log('Form sent:', this.loginForm.value);
    } else {
      console.error('Form is invalid!');
    }
  }

}
