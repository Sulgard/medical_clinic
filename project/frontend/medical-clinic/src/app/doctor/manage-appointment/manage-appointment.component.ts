import { DoctorService } from './../doctor.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentDTO, MedicineDTO, Prescription } from '../../api/rest-api';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentPrescriptionListComponent } from "../appointment-prescription-list/appointment-prescription-list.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-appointment',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    AppointmentPrescriptionListComponent
],
  templateUrl: './manage-appointment.component.html',
  styleUrl: './manage-appointment.component.css'
})
export class ManageAppointmentComponent implements OnInit {
  appointmentId!: number;
  appointment!: AppointmentDTO;
  appointmentForm: FormGroup;
  prescriptions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
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
    console.log("test");
    this.doctorService.manageAppointment(this.appointmentId, this.appointment.notes).subscribe({
      next: (response) => {
        console.log("test2");
        if (response) {
          console.log("git");
          this.snackBar.open('Appointment updated successfully!', 'Close', {
            duration: 3000,
          });
            setTimeout(() => {
            this.router.navigate(['/doctor/dashboard']);
          }, 3000);
        } else {
          this.snackBar.open('Failed to update appointment. Please try again.', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/doctor/dashboard']);
        }
      },
      error: (error) => {
        console.error('Error managing appointment:', error);
        this.snackBar.open('An error occurred while updating the appointment. Please try again.', 'Close', {
          duration: 3000,
        });
      },
      complete: () => {
        console.log('Manage appointment request completed.');
      }
    });
  }

  navigateToPatients(): void { 
    this.router.navigate(['doctor/patient-list']);
  }
  

}