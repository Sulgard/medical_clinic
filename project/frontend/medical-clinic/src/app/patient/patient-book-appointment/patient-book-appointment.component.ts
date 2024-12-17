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
  
    // Convert appointmentDate (Date) to string in yyyy-MM-dd format
    const dateStr = new Date(appointmentDate).toLocaleDateString('en-CA');
  
    // Convert appointmentTime to string in HH:mm format (assuming it's in HH:mm format already)
    const timeStr = appointmentTime.split(":").join(":");  // Ensure the time is in HH:mm format
  
    console.log("Date in correct format:", dateStr);
    console.log("Time in correct format:", timeStr);
  
    // Pass the formatted date and time as strings to the service
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
    this.fetchAvailableDoctors();
  }

  onAppointmentTimeChange(): void {
    this.fetchAvailableDoctors();
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