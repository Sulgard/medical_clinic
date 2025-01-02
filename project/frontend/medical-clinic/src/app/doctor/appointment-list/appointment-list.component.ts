import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { AuthService } from '../../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppointmentDetailsDialogComponent } from '../appointment-details-dialog/appointment-details-dialog.component';
import { PatientService } from '../../patient/patient.service';
import { AppointmentDTO, PrescriptionForListDTO } from '../../api/rest-api';
import { PatientPrescriptionsComponent } from '../../patient/patient-prescriptions/patient-prescriptions.component';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit{
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

  displayedColumns: string[] = ['appointmentDate', 'appointmentTime', 'status', 'patient', 'actions'];

  constructor(
    private doctorService: DoctorService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    const doctorId = this.authService.getUserId();
    this.isLoading = true;
    this.doctorService.listFilteredAppointments(doctorId, this.filter)
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

  manageAppointment(appointmentId: number): void {
    console.log('Manage button clicked for appointment ID:', appointmentId);
    this.router.navigate([`/doctor/manage-appointment/${appointmentId}`]);
  }

  applyFilter(): void {
    this.filter.page = 0;
    this.loadAppointments();
  }

  onPageChange(event: any): void {
    this.filter.page = event.pageIndex;
    this.filter.size = event.pageSize;
    this.loadAppointments();
  }

  navDashboard(): void {
    this.router.navigate(['/doctor/dashboard']);
  }
}
