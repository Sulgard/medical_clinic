import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../patient.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-book-appointment',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './patient-book-appointment.component.html',
  styleUrl: './patient-book-appointment.component.css'
})
export class PatientBookAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  appointmentTypes: string[] = ['Consultation', 'Follow-up', 'Diagnostics'];
  availableDoctors: any[] = [];
  selectedDate: Date | null = null;
  availableTimes: string[] = [];
  selectedDoctor: any | null = null;

  constructor(private fb: FormBuilder, private patientService: PatientService) {
    this.appointmentForm = this.fb.group({
      appointmentType: [''],
      date: [null]
    });
  }

  ngOnInit(): void {}

  onDateChange(): void {
    const date: any = this.appointmentForm.get('date')?.value;
    this.selectedDate = date;

    if (date) {
      this.patientService.getAvailableDoctors(date).subscribe((data: any) => {
        this.availableDoctors = data;
      });
    }
  }

  onDoctorSelect(doctor: any): void {
    this.selectedDoctor = doctor;
    if (this.selectedDate && doctor) {
      this.availableTimes = doctor.availableHours; // Assume backend sends this.
    }
  }

  bookAppointment(time: string): void {
    const appointmentDetails = {
      doctorId: this.selectedDoctor.id,
      patientId: 1, // Replace with authenticated patient's ID
      date: this.selectedDate,
      time: time,
      appointmentType: this.appointmentForm.get('appointmentType')?.value
    };

    this.patientService.bookAppointment(appointmentDetails).subscribe(() => {
      alert('Appointment successfully booked!');
    });
  }
}