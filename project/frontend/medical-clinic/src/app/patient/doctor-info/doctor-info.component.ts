import { DoctorForListDTO, DoctorInfoDTO } from './../../api/rest-api';
import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';
import { DoctorService } from '../../doctor/doctor.service';

@Component({
  selector: 'app-doctor-info',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './doctor-info.component.html',
  styleUrl: './doctor-info.component.css'
})
export class DoctorInfoComponent {

  constructor(
    public dialogRef: MatDialogRef<DoctorInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public doctorInfo: DoctorInfoDTO,
    private doctorService: DoctorService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  close(): void {
    this.dialogRef.close();
  }

}
