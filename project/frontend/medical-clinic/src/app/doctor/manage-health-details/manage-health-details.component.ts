import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DoctorService } from '../doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { HealthDetailsResponseDTO } from '../../api/rest-api';
import { PatientService } from '../../patient/patient.service';

@Component({
  selector: 'app-manage-health-details',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './manage-health-details.component.html',
  styleUrl: './manage-health-details.component.css'
})
export class ManageHealthDetailsComponent implements OnInit{
  patientId!: number;
  healthDetailsForm: FormGroup;
  healthDetails: HealthDetailsResponseDTO | null = null;
  isEditing: boolean = false;
  

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.healthDetailsForm = this.fb.group({
      bloodType: [this.healthDetails?.bloodType, [Validators.required]],
      allergies: [this.healthDetails?.allergies, [Validators.required]],
      chronicConditions: [this.healthDetails?.chronicConditions, [Validators.required]],
      medications: [this.healthDetails?.medications, [Validators.required]],
      emergencyContactName: [this.healthDetails?.emergencyContactName, [Validators.required]],
      emergencyContactPhone: [this.healthDetails?.emergencyContactPhone, [Validators.required]],
      notes: [this.healthDetails?.notes, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.patientId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchHealthDetails();
  }

  fetchHealthDetails() {
    this.patientService.getPatientHealthDetails(this.patientId).subscribe((data) => {
      this.healthDetails = data;
      this.healthDetailsForm.patchValue(data);
    })
  }

  saveChanges(): void { 
    if (this.healthDetailsForm.valid) {
      this.patientService.editPatientHealthDetails(this.patientId, this.healthDetailsForm.value).subscribe({
        next: () => {
          this.healthDetails = this.healthDetailsForm.value;
          this.snackBar.open('Health details saved successfully!', 'Close',
            { duration: 3000 }
          );
          this.isEditing = false;
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Failed to save health details. Please try again.', 'Close', { duration: 3000 });
        }
      });
    } else { 
      this.snackBar.open('Please fill in all required fields.', 'Close', { duration: 3000 });
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  navigateToPatients(): void {
    this.router.navigate(['doctor/patient-list']);
  }

}
