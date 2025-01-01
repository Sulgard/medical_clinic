import { Component, OnInit } from '@angular/core';
import { DoctorInfoDTO } from '../../api/rest-api';
import { AuthService } from '../../auth/auth.service';
import { DoctorService } from '../../doctor/doctor.service';
import { PatientService } from '../../patient/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailValidator, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../admin.service';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-edit',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './doctor-edit.component.html',
  styleUrl: './doctor-edit.component.css'
})
export class DoctorEditComponent implements OnInit{

  doctorId!: number;
  doctorForm: FormGroup;
  doctorDetails: DoctorInfoDTO | null = null;
  isEditing: boolean = false;
  

  constructor(
    private adminService: AdminService,
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.doctorForm = this.fb.group({
      firstName: [this.doctorDetails?.firstName, [Validators.required]],
      lastName: [this.doctorDetails?.lastName, [Validators.required]],
      email: [this.doctorDetails?.email, [Validators.required], EmailValidator],
      phoneNumber: [this.doctorDetails?.phoneNumber, [Validators.required]],
      medicalLicense: [this.doctorDetails?.medicalLicense, [Validators.required]],
      specialization: [this.doctorDetails?.specialization, [Validators.required]],
      password: [this.doctorDetails?.password, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.doctorId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchDoctorDetails();
  }

  fetchDoctorDetails() {
    this.doctorService.getDoctorDetails(this.doctorId).subscribe((data) => {
      this.doctorDetails = data;
      this.doctorForm.patchValue(data);
    })
  }

  saveChanges(): void {
    if (this.doctorForm.invalid) {
      return; // Stop the save if form is invalid
    }
    
    // Proceed to save the changes
    const updatedData = this.doctorForm.value;
    this.adminService.editDoctor(this.doctorId ,updatedData).subscribe(
      (response) => {
        console.log('Doctor details updated successfully');
        this.isEditing = false; // Switch to view mode
        this.fetchDoctorDetails(); // Refetch the updated details
      },
      (error) => {
        console.error('Failed to update doctor details', error);
      }
    );
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;

    if(this.isEditing) {
      this.doctorForm.patchValue({
        email: this.doctorDetails?.email,
        phoneNumber: this.doctorDetails?.phoneNumber,
        firstName: this.doctorDetails?.firstName,
        lastName: this.doctorDetails?.lastName,
        specialization: this.doctorDetails?.specialization,
        medicalLicense: this.doctorDetails?.medicalLicense,
        password: '',
      })
    }
  }

  navigateToBoard(): void { 
    this.router.navigate(['admin/doctors-board']);
  }
}
