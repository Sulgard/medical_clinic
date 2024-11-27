import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { PatientService } from './../patient.service';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientInfoDTO } from '../../api/rest-api';

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
  }

  viewPatientInfo(): any {
    const patientId: number = 9;
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

  bookAppointment(): void {
    this.router.navigate(['/book-appointment']);
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
