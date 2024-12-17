import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../doctor.service';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-prescription-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-prescription-dialog.component.html',
  styleUrl: './add-prescription-dialog.component.css'
})
export class AddPrescriptionDialogComponent {

  prescriptionForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private doctorService: DoctorService
  ){
    this.prescriptionForm = this.formBuilder.group({
      instruction: ['', Validators.required],
      quantity: ['', Validators.required],
      medication: ['', Validators.required],
    });
  }

  onSubmit(): void {

  }

}
