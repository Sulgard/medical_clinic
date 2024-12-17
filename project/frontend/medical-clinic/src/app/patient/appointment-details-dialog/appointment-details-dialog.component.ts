import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatientService } from '../patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';
import { AppointmentDTO } from '../../api/rest-api';


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
    private authService: AuthService
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  cancelAppointment(): void {
    if (!this.cancellationReason) return;

    const cancelDTO = {
      cancelReason: this.cancellationReason,
      patientId: this.authService.getUserId() 
    };

    this.patientService.cancelAppointment(this.appointmentDetails.appointmentId, cancelDTO).subscribe({
      next: () => {
        this.snackBar.open('Appointment cancelled successfully.', 'Close', { duration: 3000 });
        this.dialogRef.close({ cancelled: true });
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to cancel appointment. Please try again later.', 'Close', { duration: 3000 });
      },
    });
  }

  shouldShowCancellationReason(): boolean {
    return this.appointmentDetails.status !== 'COMPLETE' && this.appointmentDetails.status !== 'CANCELED';
  }

}
