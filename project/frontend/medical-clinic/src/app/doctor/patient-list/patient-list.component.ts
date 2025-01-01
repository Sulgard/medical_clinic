import { Component } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { PatientInfoComponent } from '../patient-info/patient-info.component';
import { PatientService } from '../../patient/patient.service';
import { PatientInfoDTO } from '../../api/rest-api';
import { forkJoin } from 'rxjs';

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
    sortField: 'email',
    sortDirection: 'ASC',
    page: 0,
    size: 10
  };

  displayedColumns: string[] = ['fullName', 'email'];

  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private dialog: MatDialog,
    private router: Router) {}

  ngOnInit(): void {
    this.loadPatientList();
    console.log("Patients: ", this.patients);

  }

  loadPatientList(): void {
    this.isLoading = true;
    this.doctorService.listPatients(this.filter)
      .subscribe({
        next: (response: any) => {
          console.log("Response:", response);
          this.patients = response.content || [];
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

  showPatientDetails(id: number) {
      this.patientService.getPatientInfo(id).subscribe((details: PatientInfoDTO) => {
        this.dialog.open(PatientInfoComponent, {
          data: details,
          width: '800px',
        });
      });
  }

  showPatientDetails2(id: number) {
    forkJoin({
      patient: this.patientService.getPatientInfo(id),
      health: this.patientService.getPatientHealthDetails(id),
      address: this.patientService.getPatientAddress(id)
    }).subscribe({
      next: (data) => {
        this.dialog.open(PatientInfoComponent, {
          data: data,
          width: '800px',
        });
      },
      error: (err) => {
        console.error('Error fetching patient details:', err);
      }
    });
  }
  
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
