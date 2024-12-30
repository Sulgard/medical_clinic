import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, action: () => void }
  ){}

  confirm(): void { 
    this.data.action();
    this.dialogRef.close(true);
  }

  cancel(): void { 
    this.dialogRef.close(false);
  }

}
