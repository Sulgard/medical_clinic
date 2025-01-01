import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../patient.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { AddressResponseDTO } from '../../../api/rest-api';
import { MaterialModule } from '../../../shared/material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-address',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './patient-address.component.html',
  styleUrl: './patient-address.component.css'
})
export class PatientAddressComponent implements OnInit{
  patientAddress: AddressResponseDTO | null = null;
  isLoading: boolean = true;
  isEditing = false;
  errorMessage: string = '';
  addressForm: FormGroup;

  constructor(
    private patientService: PatientService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
      this.addressForm = this.fb.group({
        country: [this.patientAddress?.country, [Validators.required]],
        province: [this.patientAddress?.province, [Validators.required]],
        city: [this.patientAddress?.city, [Validators.required]],
        zipCode: [this.patientAddress?.zipCode, [Validators.required]],
        street: [this.patientAddress?.street, [Validators.required]],
        localNumber: [this.patientAddress?.localNumber, [Validators.required]],
      });
  }

  ngOnInit(): void {
    this.viewPatientAddress();
  }

  toggleEdit(): void{
    this.isEditing = !this.isEditing;

    if(this.isEditing) {
      this.addressForm.patchValue({
        country: this.patientAddress?.country,
        province:this.patientAddress?.province,
        city: this.patientAddress?.city,
        zipCode: this.patientAddress?.zipCode,
        street: this.patientAddress?.street,
        localNumber: this.patientAddress?.localNumber,
      });
    }
  }

  viewPatientAddress(): any {
    const patientId: number = this.authService.getUserId();
    this.patientService.getPatientAddress(patientId).subscribe({
      next: (data: AddressResponseDTO) => {
        this.patientAddress = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching patient info', err);
        this.errorMessage = 'Failed to load patient information';
      this.isLoading = false;
      },
    });
  }

  submitChanges(): void {
    if(this.addressForm.valid) {
      const patientId: number = this.authService.getUserId();
      this.patientService.editPatientAddress(patientId, this.addressForm.value).subscribe(
        (response) =>  {
          this.isEditing = false;
          this.patientAddress!.country = this.addressForm.value.country;
          this.patientAddress!.province = this.addressForm.value.province;
          this.patientAddress!.city = this.addressForm.value.city;
          this.patientAddress!.zipCode = this.addressForm.value.zipCode;
          this.patientAddress!.street = this.addressForm.value.street;
          this.patientAddress!.localNumber = this.addressForm.value.localNumber;
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
}
