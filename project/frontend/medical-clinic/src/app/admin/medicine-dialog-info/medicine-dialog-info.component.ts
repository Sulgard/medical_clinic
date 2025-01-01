import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicineForListDTO } from '../../api/rest-api';
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-medicine-dialog-info',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './medicine-dialog-info.component.html',
  styleUrl: './medicine-dialog-info.component.css'
})
export class MedicineDialogInfoComponent {

  constructor(
    public dialogRef: MatDialogRef<MedicineDialogInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public medicineDetails: MedicineForListDTO,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
