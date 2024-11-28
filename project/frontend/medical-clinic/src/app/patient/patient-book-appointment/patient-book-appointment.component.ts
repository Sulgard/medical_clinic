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
export class PatientBookAppointmentComponent{
    appointmentForm: FormGroup;
    doctors = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        specialization: 'Cardiologist',
        phoneNumber: '123-456-7890',
        email: 'john.doe@example.com',
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        specialization: 'Dermatologist',
        phoneNumber: '987-654-3210',
        email: 'jane.smith@example.com',
      }
    ];

    isLoading: boolean = false;
    errorMessage: string = '';
  
    constructor(
      private fb: FormBuilder,
      private patientService: PatientService,
      private authService: AuthService,
      private router: Router
    ) {
      this.appointmentForm = this.fb.group({

      })
    }

  ngOnInit(){
  }

  bookAppointment(): void {

  }

}
