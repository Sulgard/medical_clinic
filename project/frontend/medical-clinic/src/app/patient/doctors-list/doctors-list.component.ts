import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DoctorService } from '../../doctor/doctor.service';
import { DoctorForListDTO, DoctorInfoDTO } from '../../api/rest-api';
import { DoctorInfoComponent } from '../doctor-info/doctor-info.component';

@Component({
  selector: 'app-doctors-list',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './doctors-list.component.html',
  styleUrl: './doctors-list.component.css'
})
export class DoctorsListComponent implements OnInit{
  doctors: any[] = [];
  totalPages: number = 0;
  totalElements: number = 0;
  currentPage: number = 0;
  isLoading: boolean = false;

  

  filter = {
    name: '',
    specialization: '',
    sortField: 'specialization',
    sortDirection: 'ASC',
    page: 0,
    size: 10
  };

  displayedColumns: string[] = ['fullName', 'specialization', 'actions'];
  specializationOptions: string[] = [
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Dermatology',
    'General Medicine',
    'Psychiatry'
    ];

  constructor(
    private doctorService: DoctorService,
    private dialog: MatDialog,
    private router: Router) {}

  ngOnInit(): void {
    this.loadDoctorList();
  }

  loadDoctorList(): void {
    this.isLoading = true;
    this.doctorService.listDoctors(this.filter)
      .subscribe({
        next: (response: any) => {
          // Zawartość odpowiedzi
          console.log("Response:", response);
          this.doctors = response.content || []; // Lista wizyt
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

  showDoctorDetails(id: number) {
      this.doctorService.getDoctorDetails(id).subscribe((details: DoctorInfoDTO) => {
        this.dialog.open(DoctorInfoComponent, {
          data: details,
          width: '400px',
        });
      });
  }
  
  applyFilter(): void {
    this.filter.page = 0;
    this.loadDoctorList();
  }

  onPageChange(event: any): void {
    this.filter.page = event.pageIndex;
    this.filter.size = event.pageSize;
    this.loadDoctorList();
  }

  navDashboard(): void {
    this.router.navigate(['/patient/dashboard']);
  }

}
