import { Component, OnInit } from '@angular/core';
import { AppointmentDTO, DoctorInfoDTO } from '../../api/rest-api';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent implements OnInit {
  doctorInfo: DoctorInfoDTO | null = null;
  appointments: AppointmentDTO[] | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit():void {

  }

  viewUpcomingAppointments(): void {

  }

  bookAppointment():void {

  }

  navigateAppointments():void {
    this.router.navigate(['appointment-list']);
  }

  navigatePatients():void {
    this.router.navigate(['patient-list']);
  }

  navigateProfile():void {
    this.router.navigate(['doctor-profile']);
  }

  logout():void {
    this.authService.logout();
  }
}
