import { Component, OnInit } from '@angular/core';
import { DoctorInfoDTO, PatientInfoDTO } from '../../api/rest-api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../patient/patient.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './doctor-profile.component.html',
  styleUrl: './doctor-profile.component.css'
})
export class DoctorProfileComponent implements OnInit{
  doctorInfo: DoctorInfoDTO | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  isEditing = false;
  contactForm: FormGroup;

  constructor(
    private doctorService: DoctorService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      email: [this.doctorInfo?.email, [Validators.required, Validators.email]],
      phoneNumber: [this.doctorInfo?.phoneNumber, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.viewPatientInfo();
  }

  toggleEdit(): void{
    this.isEditing = !this.isEditing;

    if(this.isEditing) {
      this.contactForm.patchValue({
        email: this.doctorInfo?.email,
        phoneNumber: this.doctorInfo?.phoneNumber,
      });
    }
  }

  saveContactInfo(): void {
    if(this.contactForm.valid) {
      const id = this.authService.getUserId();
      this.doctorService.editContactInfo(id, this.contactForm.value).subscribe(
        (response) =>  {
          this.isEditing = false;
          this.doctorInfo!.email = this.contactForm.value.email;
          this.doctorInfo!.phoneNumber = this.contactForm.value.phoneNumber;
          this.snackBar.open('Contact information updated successfully!', 'Close', {
            duration: 3000,
          });
      },
      (error) => {
        this.snackBar.open('Failed to update contact information. Please try again.', 'Close', {
          duration: 3000,
        });
      }
      );
    
    }
  }

  viewPatientInfo(): any {
    const doctorId: number = this.authService.getUserId();
    this.doctorService.getDoctorDetails(doctorId).subscribe({
      next: (data: DoctorInfoDTO) => {
        this.doctorInfo = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching patient info', err);
        this.errorMessage = 'Failed to load patient information';
      this.isLoading = false;
      },
    });
  }

  navDashboard(): void {
    this.router.navigate(['/doctor/dashboard']);
  }

}
