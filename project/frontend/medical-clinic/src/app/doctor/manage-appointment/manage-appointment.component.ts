import { DoctorService } from './../doctor.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentDTO } from '../../api/rest-api';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-manage-appointment',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './manage-appointment.component.html',
  styleUrl: './manage-appointment.component.css'
})
export class ManageAppointmentComponent implements OnInit {
  appointmentId!: number;
  appointment!: AppointmentDTO;
  appointmentForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.appointmentForm = this.formBuilder.group({
      notes: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.appointmentId = +this.route.snapshot.paramMap.get('id')!;
    this.loadAppointmentDetails();
  }

  loadAppointmentDetails(): void {
    this.doctorService.getAppointmentById(this.appointmentId).subscribe((appointment) => {
      this.appointment = appointment;
      this.initializeForm();
    });
  }

  initializeForm(): void {
    this.appointmentForm.setValue({
      notes: this.appointment.notes,
    });
  }

  onSubmit(): void {
  this.appointment.notes = this.appointmentForm.value.notes;
  this.doctorService.manageAppointment(this.appointmentId, this.appointment).subscribe({
    next: (response) => {
      if (response) { 
        alert('Appointment updated successfully!');
        this.router.navigate(['/doctor/dashboard']); 
      } else {
        alert('Failed to update appointment. Please try again.');
        this.router.navigate(['/doctor/dashboard']); 
      }
    },
    error: (error) => {
      console.error('Error managing appointment:', error);
      alert('An error occurred while updating the appointment. Please try again.');
    },
    complete: () => {
      console.log('Manage appointment request completed.');
    }
  });
}
}