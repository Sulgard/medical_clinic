import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { CreateDoctorRequestDTO } from '../../api/rest-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-doctor',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-doctor.component.html',
  styleUrl: './create-doctor.component.css'
})
export class CreateDoctorComponent {
  doctorForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  genderOptions = ["MALE", "FEMALE", "NONE"];

  specializationOptions: string[] = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Dermatology',
  'General Medicine',
  'Psychiatry'
  ];

  filteredSpecializations: string[] = this.specializationOptions;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
    ){
      this.doctorForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        birthDate: ['', Validators.required],
        gender: ['', Validators.required],
        specialization: ['', Validators.required],
        medicalLicense: ['', Validators.required],
        phoneNumber: ['', Validators.required]
      })
    }

    onSubmit() {
      if(this.doctorForm.valid) {
        const registerRequest: CreateDoctorRequestDTO = {
          firstName: this.doctorForm.value.firstName,
          lastName: this.doctorForm.value.lastName,
          email: this.doctorForm.value.email,
          password: this.doctorForm.value.password,
          birthDate: this.doctorForm.value.birthDate,
          gender: this.doctorForm.value.gender,
          phoneNumber: this.doctorForm.value.phoneNumber,
          specialization: this.doctorForm.value.specialization,
          medicalLicense: this.doctorForm.value.medicalLicense
        }
        this.adminService.createDoctor(registerRequest).subscribe({
          next: () => {
            this.successMessage = 'Successfull signing up attempt. You can log in';
            this.doctorForm.reset();
          },
          error: (err) => {
            console.error(err);
            this.errorMessage = 'Error occured during registration';
          }
        });
      }
    }

    navigateToBoard(): void { 
      this.router.navigate(['admin/doctors-board']);
    }

}
