import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PatientService } from '../../patient/patient.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';
import { HealthDetailsResponseDTO, PatientInfoDTO } from '../../api/rest-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-info',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './patient-info.component.html',
  styleUrl: './patient-info.component.css'
})
export class PatientInfoComponent{
  constructor(
    public dialogRef: MatDialogRef<PatientInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}


  close(): void { 
    this.dialogRef.close();
  }

  bookApointment(): void {
    const patientId = this.data.patient.id;
    this.router.navigate(['/doctor/book-appointment'], { queryParams: { patientId: patientId } });    this.dialogRef.close();
  }

  editHealthDetails(patientId: number): void {
    console.log('Manage button clicked for patient ID:', patientId);
    this.router.navigate([`/doctor/manage-health-details/${patientId}`]);
    this.dialogRef.close();
  }


}
