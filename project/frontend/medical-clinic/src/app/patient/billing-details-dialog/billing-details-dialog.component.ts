import { AuthService } from './../../auth/auth.service';
import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatientService } from '../patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BillingDTO } from '../../api/rest-api';

@Component({
  selector: 'app-billing-details-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './billing-details-dialog.component.html',
  styleUrl: './billing-details-dialog.component.css'
})
export class BillingDetailsDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<BillingDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public billingDetails: BillingDTO,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    private AuthService: AuthService
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  payForAppointment(billingId: number): void {
    this.patientService.payForAppointment(billingId).subscribe({
      next: () => {
        this.snackBar.open('Succesfull payment.', 'Close', { duration: 3000 });
        this.dialogRef.close({ cancelled: true });
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to pay for appointment. Please try again later.', 'Close', { duration: 3000 });
      },
    });
  }

}
