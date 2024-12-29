import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppointmentDTO } from '../../api/rest-api';
import { PatientService } from '../../patient/patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';
import { Route, Router } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-details-dialog',
  standalone: true,
  imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
  ],
  templateUrl: './appointment-details-dialog.component.html',
  styleUrl: './appointment-details-dialog.component.css'
})
export class AppointmentDetailsDialogComponent {
  cancellationReason: string = '';

  constructor(
    public dialogRef: MatDialogRef<AppointmentDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public appointmentDetails: AppointmentDTO,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  manageAppointment(appointmentId: number): void {
    console.log('Manage button clicked for appointment ID:', appointmentId);
    this.router.navigate([`/doctor/manage-appointment/${appointmentId}`]);
    this.dialogRef.close();
  }

  shouldShowCancellationReason(): boolean {
    return this.appointmentDetails.status !== 'COMPLETE' && this.appointmentDetails.status !== 'CANCELED';
  }
}
