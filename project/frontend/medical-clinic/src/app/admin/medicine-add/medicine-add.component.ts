import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { MedicineForListDTO } from '../../api/rest-api';

@Component({
  selector: 'app-medicine-add',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './medicine-add.component.html',
  styleUrl: './medicine-add.component.css'
})
export class MedicineAddComponent {
  medicineForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  genderOptions = ["MALE", "FEMALE", "NONE"];

  specializationOptions: string[] = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Dermatology',
  'General Medicine',
  'Psychiatry'
  ];

  filteredSpecializations: string[] = this.specializationOptions;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
    ){
      this.medicineForm = this.fb.group({
        name: ['', Validators.required],
        category: ['', Validators.required],
        dosageForm: ['', Validators.required],
        manufacturer: ['', Validators.required],
      })
    }

    onSubmit() {
      if(this.medicineForm.valid) {
        const registerRequest: any = {
          name: this.medicineForm.value.name,
          category: this.medicineForm.value.category,
          dosageForm: this.medicineForm.value.dosageForm,
          manufacturer: this.medicineForm.value.manufacturer,
        }
        this.adminService.addMedicine(registerRequest).subscribe({
          next: () => {
            this.successMessage = 'Successfull signing up attempt. You can log in';
            this.medicineForm.reset();
          },
          error: (err) => {
            console.error(err);
            this.errorMessage = 'Error occured during registration';
          }
        });
      }
    }

    navigateToBoard(): void { 
      this.router.navigate(['admin/medicine-board']);
    }
}
