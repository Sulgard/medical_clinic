import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medicine-list',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './medicine-list.component.html',
  styleUrl: './medicine-list.component.css'
})
export class MedicineListComponent implements OnInit{
  medicines: any[] = [];
  totalPages: number = 0;
  totalElements: number = 0;
  currentPage: number = 0;
  isLoading: boolean = false;

  

  filter = {
    name: '',
    category: '',
    manufacturer: '',
    sortField: 'manufacturer',
    sortDirection: 'ASC',
    page: 0,
    size: 10
  };
  
  displayedColumns: string[] = ['name', 'manufacturer', 'category'];

  constructor(
    private doctorService: DoctorService,
    private router: Router
  ){}

  ngOnInit(): void {
      this.loadMedicineList();
  }

  loadMedicineList(): void {
    this.isLoading = true;
    this.doctorService.listFilteredMedications(this.filter)
      .subscribe({
        next: (response: any) => {
          console.log("Response:", response);
          this.medicines = response.content || [];
          this.totalPages = response.totalPages;
          console.log("total Pages:", this.totalPages);
          this.totalElements = response.totalElements
          console.log("total Elements:", this.totalElements);
          this.currentPage = response.currentPage
          console.log("current Page:", this.currentPage);
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Error fetching appointments:', error);
          this.isLoading = false;
        }
      });
  }

  applyFilter(): void {
    this.filter.page = 0;
    this.loadMedicineList();
  }

  onPageChange(event: any): void {
    this.filter.page = event.pageIndex;
    this.filter.size = event.pageSize;
    this.loadMedicineList();
  }

  navDashboard(): void {
    this.router.navigate(['/doctor/dashboard']);
  }

}
