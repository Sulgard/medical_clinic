import { Component } from '@angular/core';
import { RegisterPatientDto } from '../../api/rest-api';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-add',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './patient-add.component.html',
  styleUrl: './patient-add.component.css'
})
export class PatientAddComponent {
   registerForm: FormGroup;
    successMessage: string | null = null;
    errorMessage: string | null = null;
    genderOptions = ["MALE", "FEMALE", "NONE"];
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
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
        province: ['', Validators.required],
        localNumber: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
    }
  
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
  
    return password === confirmPassword ? null : { passwordMismatch: true };
  };
  
  onSubmit() {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if (control && control.invalid) {
        console.log(`Field: ${key}, Invalid: ${control.invalid}, Errors:`, control.errors);
      }
    });
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
        province: this.registerForm.value.province,
        city: this.registerForm.value.city,
        zipCode: this.registerForm.value.zipCode,
        street: this.registerForm.value.street,
        localNumber: this.registerForm.value.localNumber
      }
      this.authService.register(registerRequest).subscribe({
        next: () => {
          this.successMessage = 'Patient added successfully';
          this.registerForm.reset();
          this.router.navigate(['/admin/patients-board']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Error occured during registration';
        }
      });
    }
  }

  navToPatientBoard(): void {
    this.router.navigate(['/admin/patients-board']);
  }

}
