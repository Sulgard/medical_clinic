import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PrescriptionForListDTO } from '../../api/rest-api';
import { PatientService } from '../patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-patient-prescriptions',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './patient-prescriptions.component.html',
  styleUrl: './patient-prescriptions.component.css'
})
export class PatientPrescriptionsComponent {

    constructor(
      public dialogRef: MatDialogRef<PatientPrescriptionsComponent>,
      @Inject(MAT_DIALOG_DATA) public prescriptionDetails: PrescriptionForListDTO[],
      private patientService: PatientService,
      private snackBar: MatSnackBar,
      private authService: AuthService
    ) {}

    close(): void {
      this.dialogRef.close();
    }

}
