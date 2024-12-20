import { Component } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent {
  patients: any[] = [];
  totalPages: number = 0;
  totalElements: number = 0;
  currentPage: number = 0;
  isLoading: boolean = false;

  

  filter = {
    name: '',
    email: '',
    sortField: 'specialization',
    sortDirection: 'ASC',
    page: 0,
    size: 10
  };

  displayedColumns: string[] = ['fullName', 'email'];

  constructor(
    private doctorService: DoctorService,
    private dialog: MatDialog,
    private router: Router) {}

  ngOnInit(): void {
    this.loadPatientList();
  }

  loadPatientList(): void {
    this.isLoading = true;
    this.doctorService.listPatients(this.filter)
      .subscribe({
        next: (response: any) => {
          // Zawartość odpowiedzi
          console.log("Response:", response);
          this.patients = response.content || []; // Lista wizyt
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

  // showDoctorDetails(id: number) {
  //     this.doctorService.getDoctorDetails(id).subscribe((details: DoctorInfoDTO) => {
  //       this.dialog.open(DoctorInfoComponent, {
  //         data: details,
  //         width: '400px',
  //       });
  //     });
  // }
  
  applyFilter(): void {
    this.filter.page = 0;
    this.loadPatientList();
  }

  onPageChange(event: any): void {
    this.filter.page = event.pageIndex;
    this.filter.size = event.pageSize;
    this.loadPatientList();
  }

  navDashboard(): void {
    this.router.navigate(['/doctor/dashboard']);
  }


}
