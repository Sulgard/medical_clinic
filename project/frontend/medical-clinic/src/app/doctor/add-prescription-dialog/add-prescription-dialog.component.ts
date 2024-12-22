import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../doctor.service';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicineDTO } from '../../api/rest-api';

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
  medications: MedicineDTO[] = [];
  filteredMedications: MedicineDTO[] = [];
  searchQuery: string = '';
  selectedMedicine: MedicineDTO | null = null;
  
  constructor(
    private formBuilder: FormBuilder,
    private doctorService: DoctorService,
    public dialogRef: MatDialogRef<AddPrescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { medications: MedicineDTO[] }
  ){
    this.prescriptionForm = this.formBuilder.group({
      medicineId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      instruction: ['', Validators.required],
    });
    
    this.medications = this.data.medications;
    this.filteredMedications = this.medications;
  }

  onSubmit(): void {
    if (this.prescriptionForm.valid) {
      this.dialogRef.close(this.prescriptionForm.value);
    }
  }

  onSearchChange(): void {
    if (this.searchQuery.trim()) {
      this.filteredMedications = this.medications.filter(medicine => 
        medicine.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredMedications = this.medications; 
    }
  }

  selectMedicine(medicine: MedicineDTO): void {
    this.selectedMedicine = medicine;
    this.prescriptionForm.controls['medicineId'].setValue(medicine.id);
    this.searchQuery = medicine.name;

    this.filteredMedications = [];
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
  

}
