import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressResponseDTO, MedicineForListDTO, UpdateConfirmationDTO } from '../../api/rest-api';
import { AdminService } from '../admin.service';
import { DoctorService } from '../../doctor/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientService } from '../../patient/patient.service';

@Component({
  selector: 'app-patient-edit-address',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './patient-edit-address.component.html',
  styleUrl: './patient-edit-address.component.css'
})
export class PatientEditAddressComponent implements OnInit{
  patientId!: number;
  addressDetails: AddressResponseDTO | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  isEditing = false;
  addressForm: FormGroup;

  constructor(
    private patientService: PatientService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.addressForm = this.fb.group({
      country: [this.addressDetails?.country, [Validators.required]],
      province: [this.addressDetails?.province, [Validators.required]],
      city: [this.addressDetails?.city, [Validators.required]],
      zipCode: [this.addressDetails?.zipCode, [Validators.required]],
      street: [this.addressDetails?.street, [Validators.required]],
      localNumber: [this.addressDetails?.localNumber, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.patientId = +this.route.snapshot.paramMap.get('id')!;
    this.viewPatientAddress();
  }

  toggleEdit(): void{
    this.isEditing = !this.isEditing;

    if(this.isEditing) {
      this.addressForm.patchValue({
        country: this.addressDetails?.country,
        province:this.addressDetails?.province,
        city: this.addressDetails?.city,
        zipCode: this.addressDetails?.zipCode,
        street: this.addressDetails?.street,
        localNumber: this.addressDetails?.localNumber,
      });
    }
  }

  submitChanges(): void {
    if(this.addressForm.valid) {
      this.patientService.editPatientAddress(this.patientId, this.addressForm.value).subscribe(
        (response) =>  {
          this.isEditing = false;
          this.addressDetails!.country = this.addressForm.value.country;
          this.addressDetails!.province = this.addressForm.value.province;
          this.addressDetails!.city = this.addressForm.value.city;
          this.addressDetails!.zipCode = this.addressForm.value.zipCode;
          this.addressDetails!.street = this.addressForm.value.street;
          this.addressDetails!.localNumber = this.addressForm.value.localNumber;
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

  viewPatientAddress(): any {
    this.patientService.getPatientAddress(this.patientId).subscribe({
      next: (data: AddressResponseDTO) => {
        this.addressDetails = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching patient info', err);
        this.errorMessage = 'Failed to load patient information';
      this.isLoading = false;
      },
    });
  }

  navigateToBoard(): void {
    this.router.navigate(['/admin/patients-board']);
  }
}
