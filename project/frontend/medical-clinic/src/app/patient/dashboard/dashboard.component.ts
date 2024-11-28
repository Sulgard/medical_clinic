import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { PatientService } from './../patient.service';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppointmentDTO, PatientInfoDTO } from '../../api/rest-api';

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
  appointments: AppointmentDTO[] | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  patientName = 'John Doe';
  upcomingAppointments = [
    { date: new Date(), doctor: 'Dr. Smith' },
    { date: new Date('2024-12-01'), doctor: 'Dr. Adams' }
  ];

  constructor(
    private patientService: PatientService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.viewPatientInfo();
    this.viewUpcomingAppointments();
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
    this.patientService.listAppointmentsForPatient(patientId).subscribe({
      next: (data: AppointmentDTO[]) => {
        this.appointments = data;
      },
      error: (err) => {
        console.error('Error fetching appointments:', err);
      }
    });
  }

  bookAppointment(): void {
    this.router.navigate(['/patient/book-appointment']);
  }

  viewPrescriptions(): void {
    this.router.navigate(['/prescriptions']);
  }

  viewBillings(): void {
    this.router.navigate(['/billings']);
  }

  viewAppointments(): void {
    this.router.navigate(['/appointments']);
  }


  logout(): void {
    this.authService.logout();
  }

}
