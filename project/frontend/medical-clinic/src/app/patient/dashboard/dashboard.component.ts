import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { PatientService } from './../patient.service';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppointmentDTO, AppointmentForListDTO, BillingDTO, BillingForListDTO, PatientInfoDTO } from '../../api/rest-api';
import { AppointmentDetailsDialogComponent } from '../appointment-details-dialog/appointment-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BillingDetailsDialogComponent } from '../billing-details-dialog/billing-details-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  patientInfo: PatientInfoDTO | null = null;
  appointments: AppointmentForListDTO[] | null = null;
  billings: BillingForListDTO[] | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private patientService: PatientService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.viewPatientInfo();
    this.viewUpcomingAppointments();
    this.viewPendingCharges();
  }

  viewPatientInfo(): any {
    const patientId: number = this.authService.getUserId();
    this.patientService.getPatientInfo(patientId).subscribe({
      next: (data: PatientInfoDTO) => {
        this.patientInfo = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching patient info', err);
        this.errorMessage = 'Failed to load patient information';
      this.isLoading = false;
      },
    });
  }

  viewUpcomingAppointments(): void {
    const patientId: number = this.authService.getUserId();
    this.patientService.getUpcoming(patientId).subscribe({
      next: (data: AppointmentForListDTO[]) => {
        this.appointments = data;
      },
      error: (err) => {
        console.error('Error fetching appointments:', err);
      }
    });
  }

  viewPendingCharges(): void {
    const patientId: number = this.authService.getUserId();
    this.patientService.getPendingCharges(patientId).subscribe({
      next: (data: BillingForListDTO[]) => {
        this.billings = data;
      },
      error: (err) => {
        console.error('Error fetching appointments:', err);
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

  showBillingDetails(id: number) {
    console.log("ID: ", id);
    this.patientService.getBillingDetails(id).subscribe((details: BillingDTO) => {
      this.dialog.open(BillingDetailsDialogComponent, {
        data: details,
        width: '400px',
      });
    });
  }

  bookAppointment(): void {
    this.router.navigate(['/patient/book-appointment']);
  }

  viewDoctors(): void {
    this.router.navigate(['/patient/doctors-list']);
  }

  viewBillings(): void {
    this.router.navigate(['/patient/billing-list']);
  }

  viewAppointments(): void {
    this.router.navigate(['/patient/patient-appointments']);
  }

  viewProfile(): void {
    this.router.navigate(['/patient/patient-profile']);
  }


  logout(): void {
    this.authService.logout();
  }

}
