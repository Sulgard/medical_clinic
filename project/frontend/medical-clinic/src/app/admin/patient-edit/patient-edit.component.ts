import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../patient/patient.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { PatientInfoDTO } from '../../api/rest-api';

@Component({
  selector: 'app-patient-edit',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './patient-edit.component.html',
  styleUrl: './patient-edit.component.css'
})
export class PatientEditComponent implements OnInit{
  patientId!: number;
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
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.contactForm = this.fb.group({
      firstName: [this.patientInfo?.firstName, [Validators.required]],
      lastName: [this.patientInfo?.lastName, [Validators.required]],
      email: [this.patientInfo?.email, [Validators.required, Validators.email]],
      phoneNumber: [this.patientInfo?.phoneNumber, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.patientId = +this.route.snapshot.paramMap.get('id')!;
    this.viewPatientInfo();
  }

  toggleEdit(): void{
    this.isEditing = !this.isEditing;

    if(this.isEditing) {
      this.contactForm.patchValue({
        firstName: this.patientInfo?.firstName,
        lastName:this.patientInfo?.lastName,
        email: this.patientInfo?.email,
        phoneNumber: this.patientInfo?.phoneNumber,
      });
    }
  }

  saveContactInfo(): void {
    if(this.contactForm.valid) {
      this.patientService.editContactInfo(this.patientId, this.contactForm.value).subscribe(
        (response) =>  {
          this.isEditing = false;
          this.patientInfo!.firstName = this.contactForm.value.firstName;
          this.patientInfo!.lastName = this.contactForm.value.lastName;
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
    this.patientService.getPatientInfo(this.patientId).subscribe({
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

  navigateToBoard(): void { 
    this.router.navigate(['admin/patients-board']);
  }
}
