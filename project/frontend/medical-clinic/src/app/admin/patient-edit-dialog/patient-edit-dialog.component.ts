import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatientService } from '../../patient/patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './patient-edit-dialog.component.html',
  styleUrl: './patient-edit-dialog.component.css'
})
export class PatientEditDialogComponent {
    constructor(
      public dialogRef: MatDialogRef<PatientEditDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private patientService: PatientService,
      private snackBar: MatSnackBar,
      private authService: AuthService,
      private router: Router
    ) {}
  
  
    close(): void { 
      this.dialogRef.close();
    }
  
  
    editAddressInfo(patientId: number): void {
      console.log('Manage button clicked for patient ID:', patientId);
      this.router.navigate([`/admin/patient-edit-address/${patientId}`]);
      this.dialogRef.close();
    }
  
    editPersonalInfo(patientId: number): void {
      console.log('Manage button clicked for patient ID:', patientId);
      this.router.navigate([`/admin/patient-edit/${patientId}`]);
      this.dialogRef.close();
    }

}
