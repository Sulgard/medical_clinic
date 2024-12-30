import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentDTO, AppointmentFilterDTO, PrescriptionForListDTO } from '../../api/rest-api';
import { PatientService } from '../patient.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentDetailsDialogComponent } from '../appointment-details-dialog/appointment-details-dialog.component';
import { Router } from '@angular/router';
import { PatientPrescriptionsComponent } from '../patient-prescriptions/patient-prescriptions.component';
@Component({
  selector: 'app-patient-appointments',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './patient-appointments.component.html',
  styleUrl: './patient-appointments.component.css'
})
export class PatientAppointmentsComponent implements OnInit{
  appointments: any[] = [];
  totalPages: number = 0;
  totalElements: number = 0;
  currentPage: number = 0;
  isLoading: boolean = false;

  filter = {
    appointmentStatus: '',
    startDate: '',
    endDate: '',
    sortField: 'appointmentDate',
    sortDirection: 'ASC',
    page: 0,
    size: 10
  };

  displayedColumns: string[] = ['appointmentDate', 'appointmentTime', 'status', 'doctor'];

  constructor(
    private patientService: PatientService,
    private fb: FormBuilder, 
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router) {}

  ngOnInit(): void {
    this.loadAppointments2();
  }

  showAppointmentDetails(id: number) {
    console.log("ID: ", id);
      this.patientService.getAppointmentDetails(id).subscribe((details: AppointmentDTO) => {
        this.dialog.open(AppointmentDetailsDialogComponent, {
          data: details,
          width: '400px',
        });
      });
  }

  showPrescriptionListOfAppointment(id: number) {
    console.log("ID: ", id);
      this.patientService.getPrescriptionListOfAppointment(id).subscribe((details: PrescriptionForListDTO[]) => {
        this.dialog.open(PatientPrescriptionsComponent, {
          data: details,
          width: '400px',
        });
      });
  }

  loadAppointments2(): void {
    const patientId = this.authService.getUserId();
    this.isLoading = true;
    this.patientService.getAppointments2(patientId, this.filter)
      .subscribe({
        next: (response: any) => {
          console.log("Response:", response);
          this.appointments = response.content || [];
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
    this.loadAppointments2();
  }

  onPageChange(event: any): void {
    this.filter.page = event.pageIndex;
    this.filter.size = event.pageSize;
    this.loadAppointments2();
  }

  navDashboard(): void {
    this.router.navigate(['/patient/dashboard']);
  }
}
