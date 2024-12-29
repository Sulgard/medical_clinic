import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { CreateAppointmentRequestDTO } from '../../api/rest-api';

@Component({
  selector: 'app-patient-book-appointment',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './patient-book-appointment.component.html',
  styleUrl: './patient-book-appointment.component.css'
})
export class PatientBookAppointmentComponent implements OnInit {
  appointmentTypes: any[] = [];
  availableDoctors: any[] = [];
  minTime = "08:00";
  maxTime = "18:00";
  availableTimes: string[] = [];
  appointment: CreateAppointmentRequestDTO = {
    appointmentDate: '',
    appointmentTime: '',
    appointmentReason: '',
    appointmentTypeId: 0,
    patientId: 0,
    doctorId: 0
  };
  patientId: number;

  constructor(
    private fb: FormBuilder, 
    private patientService: PatientService,
    private authService: AuthService,
    private router: Router) {
    this.patientId = this.authService.getUserId();
    this.generateAvailableTimes();
    }

    generateAvailableTimes() {
      let startHour = 8;
      let endHour = 18;
      for (let hour = startHour; hour <= endHour; hour++) {
        this.availableTimes.push(`${hour < 10 ? '0' : ''}${hour}:00`);
      }
    }
  ngOnInit(): void {
    this.fetchAppointmentTypes();
  }

  fetchAppointmentTypes(): void{
    this.patientService.fetchAppointmentTypes().subscribe((types) => {
      this.appointmentTypes = types;
    });
  }

  fetchAvailableDoctors(): void {
    const { appointmentDate, appointmentTime } = this.appointment;

    if (!appointmentDate || !appointmentTime) {
      return;
    }
  
    const dateObj = new Date(appointmentDate);
    const dateStr = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;
    this.appointment.appointmentDate = dateStr;
    const timeStr = appointmentTime.split(":").join(":");
  
    console.log("Date in correct format:", dateStr);
    console.log("Time in correct format:", timeStr);
  
    this.patientService.getAvailableDoctors(dateStr, timeStr)
      .subscribe({
        next: (doctors) => {
          this.availableDoctors = doctors;
          console.log("Available doctors fetched successfully:", doctors);
        },
        error: (err) => {
          console.error("Error fetching available doctors:", err);
        }
      });
  }
  
  onAppointmentDateChange(): void {
    if (this.appointment.appointmentDate && this.appointment.appointmentTime) {
      this.fetchAvailableDoctors();
    }
  }

  onAppointmentTimeChange(): void {
    if (this.appointment.appointmentDate && this.appointment.appointmentTime) {
      this.fetchAvailableDoctors();
    }
  }

  bookAppointment(): void {
    this.appointment.patientId = this.authService.getUserId();
    this.patientService.bookAppointment(this.appointment).subscribe((response) => {
      if (response.correct) {
        alert('Appointment booked successfully!');
      } else {
        alert('Failed to book appointment. Please try again.');
      }
    });
  }

  navDashboard(): void {
    this.router.navigate(['/patient/dashboard']);
  }
}