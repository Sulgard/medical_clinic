import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { DoctorInfoDTO, MedicineDTO, MedicineFilterDTO, MedicineForListDTO } from '../../api/rest-api';
import { AdminService } from '../admin.service';
import { DoctorService } from '../../doctor/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-medicine-edit',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './medicine-edit.component.html',
  styleUrl: './medicine-edit.component.css'
})
export class MedicineEditComponent implements OnInit{
    medicineId!: number;
    medicineForm: FormGroup;
    medicineDetails: MedicineForListDTO | null = null;
    isEditing: boolean = false;
    
  
    constructor(
      private adminService: AdminService,
      private doctorService: DoctorService  ,
      private route: ActivatedRoute,
      private router: Router,
      private fb: FormBuilder,
      private snackBar: MatSnackBar
    ) {
      this.medicineForm = this.fb.group({
        name: [this.medicineDetails?.name, [Validators.required]],
        category: [this.medicineDetails?.category, [Validators.required]],
        dosageForm: [this.medicineDetails?.dosageForm, [Validators.required]],
        manufacturer: [this.medicineDetails?.manufacturer, [Validators.required]],
      });
    }
  
    ngOnInit(): void {
      this.medicineId = +this.route.snapshot.paramMap.get('id')!;
      this.fetchMedicineDetails();
    }
  
    fetchMedicineDetails() {
      this.adminService.getMedicineInfo(this.medicineId).subscribe((data) => {
        this.medicineDetails = data;
        this.medicineForm.patchValue(data);
      })
    }
  
    saveChanges(): void {
      if (this.medicineForm.invalid) {
        return; // Stop the save if form is invalid
      }
      
      // Proceed to save the changes
      const updatedData = this.medicineForm.value;
      this.adminService.editMedicine(this.medicineId ,updatedData).subscribe(
        (response) => {
          console.log('Doctor details updated successfully');
          this.isEditing = false; // Switch to view mode
          this.fetchMedicineDetails(); // Refetch the updated details
        },
        (error) => {
          console.error('Failed to update doctor details', error);
        }
      );
    }
  
    toggleEdit(): void {
      this.isEditing = !this.isEditing;
  
      if(this.isEditing) {
        this.medicineForm.patchValue({
          name: this.medicineDetails?.name,
          category: this.medicineDetails?.category,
          dosageForm: this.medicineDetails?.dosageForm,
          manufacturer: this.medicineDetails?.manufacturer,
        })
      }
    }
  
    navigateToBoard(): void { 
      this.router.navigate(['admin/medicine-board']);
    }

}
