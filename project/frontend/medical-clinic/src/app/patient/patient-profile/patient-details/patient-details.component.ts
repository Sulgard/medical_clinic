import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientInfoDTO } from '../../../api/rest-api';
import { PatientService } from '../../patient.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent implements OnInit{
  patientInfo: PatientInfoDTO | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  isEditing = false;
  contactForm: FormGroup;

  constructor(
    private patientService: PatientService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      email: [this.patientInfo?.email, [Validators.required, Validators.email]],
      phoneNumber: [this.patientInfo?.phoneNumber, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.viewPatientInfo();
  }

  toggleEdit(): void{
    this.isEditing = !this.isEditing;

    if(this.isEditing) {
      this.contactForm.patchValue({
        email: this.patientInfo?.email,
        phoneNumber: this.patientInfo?.phoneNumber,
      });
    }
  }

  saveContactInfo(): void {
    if(this.contactForm.valid) {
      const id = this.authService.getUserId();
      this.patientService.editContactInfo(id, this.contactForm.value).subscribe(
        (response) =>  {
          this.isEditing = false;
          this.patientInfo!.email = this.contactForm.value.email;
          this.patientInfo!.phoneNumber = this.contactForm.value.phoneNumber;
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
    const patientId: number = this.authService.getUserId();
    this.patientService.getPatientInfo(patientId).subscribe({
      next: (data: PatientInfoDTO) => {
        this.patientInfo = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching patient info', err);
        this.errorMessage = 'Failed to load patient information';
      this.isLoading = false;
      },
    });
  }

}
