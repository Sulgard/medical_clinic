import { Component, OnInit } from '@angular/core';
import { AppointmentDTO, DoctorInfoDTO } from '../../api/rest-api';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DoctorService } from '../doctor.service';
import { CalendarModule, DateAdapter, CalendarEvent } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    CalendarModule
  ],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent implements OnInit {
  doctorInfo: DoctorInfoDTO | null = null;
  appointments: AppointmentDTO[] | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  viewDate: Date = new Date();
  calendarEvents: CalendarEvent[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private doctorService: DoctorService

  ){}

  ngOnInit():void {
    this.viewUpcomingAppointments();
  }

  viewUpcomingAppointments(): void {
    const doctorId: number = this.authService.getUserId();
    this.doctorService.listAppointmentsForDocotr(doctorId).subscribe({
      next: (data: AppointmentDTO[]) => {
        this.appointments = data;
      },
      error: (err: any) => {
        console.error('Error fetching appointments:', err);
      }
    });
  }

  bookAppointment():void {

  }

  navigateAppointments():void {
    this.router.navigate(['/doctor/appointment-list']);
  }

  navigatePatients():void {
    this.router.navigate(['/doctor/patient-list']);
  }

  navigateProfile():void {
    this.router.navigate(['/doctor/profile']);
  }

  navigateMedicines():void {
    this.router.navigate(['/doctor/medicine-list']);
  }

  logout():void {
    this.authService.logout();
  }

  manageAppointment(appointmentId: number): void {
    console.log('Manage button clicked for appointment ID:', appointmentId);
    this.router.navigate([`/doctor/manage-appointment/${appointmentId}`]);
  }
}
