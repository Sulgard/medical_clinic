import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { AuthService } from '../auth.service';
import { GenderEnum, RegisterPatientDto } from '../../api/rest-api';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  genderOptions = ["MALE", "FEMALE", "NONE"];

constructor(
  private fb: FormBuilder,
  private authService: AuthService,
  private router: Router
) {
  this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      insuranceNumber: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      county: ['', Validators.required],
      localNumber: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator
    });
  }

passwordMatchValidator(form: FormGroup) {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
}

onSubmit() {
  if(this.registerForm.valid) {
    const registerRequest: RegisterPatientDto = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      birthDate: this.registerForm.value.birthDate,
      gender: this.registerForm.value.gender,
      phoneNumber: this.registerForm.value.phoneNumber,
      insuranceNumber: this.registerForm.value.insuranceNumber,
      country: this.registerForm.value.country,
      county: this.registerForm.value.county,
      city: this.registerForm.value.city,
      zipCode: this.registerForm.value.zipCode,
      street: this.registerForm.value.street,
      localNumber: this.registerForm.value.localNumber
    }
    this.authService.register(registerRequest).subscribe({
      next: () => {
        this.successMessage = 'Successfull signing up attempt. You can log in';
        this.registerForm.reset();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error occured during registration';
      }
    });
  }
}

}
