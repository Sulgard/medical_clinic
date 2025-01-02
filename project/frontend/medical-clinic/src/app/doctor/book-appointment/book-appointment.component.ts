import { Component, OnInit } from '@angular/core';
import { CreateAppointmentRequestDTO, PatientInfoDTO } from '../../api/rest-api';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../patient/patient.service';
import { DoctorService } from '../doctor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css'
})
export class BookAppointmentComponent implements OnInit{
  patientId!: number;
  patient!: PatientInfoDTO;
  doctorId: number;
  appointmentTypes: any[] = [];
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

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.doctorId = this.authService.getUserId();
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
  this.route.queryParams.subscribe((params) => {
    console.log("Params", params);
    this.patientId = +params['patientId'];
  });
  this.fetchAppointmentTypes();
  this.fetchPatientInfo();
  console.log("patientId:", this.patientId);
}

fetchAppointmentTypes(): void{
  this.patientService.fetchAppointmentTypes().subscribe((types) => {
    this.appointmentTypes = types;
  });
}

fetchPatientInfo(): void{
  this.patientService.getPatientInfo(this.patientId).subscribe((data) => {
    this.patient = data;
  })
}

onAppointmentDateChange(): void {
  if (this.appointment.appointmentDate && this.appointment.appointmentTime) {
  }
}

onAppointmentTimeChange(): void {
  const { appointmentDate, appointmentTime } = this.appointment;

  if (!appointmentDate || !appointmentTime) {
    return;
  }

  const dateObj = new Date(appointmentDate);
  const dateStr = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;
  this.appointment.appointmentDate = dateStr;
  const timeStr = appointmentTime.length === 5 ? appointmentTime + ":00" : appointmentTime;

  console.log("Date in correct format:", dateStr);
  console.log("Time in correct format:", timeStr);
  if (this.appointment.appointmentDate && this.appointment.appointmentTime) {
    this.doctorService
      .checkDoctorAvailability(this.doctorId, dateStr, timeStr)
      .subscribe({
        next: (isAvailable: boolean) => {
          if (!isAvailable) {
            this.snackBar.open('The selected time is already booked. Please choose another time.', 'Close', {
              duration: 3000,
            });
            this.appointment.appointmentTime = '';
          }
        },
        error: (err: any) => console.error('Failed to check doctor availability', err),
      });
  }
}


bookAppointment(): void { 
  this.appointment.patientId = this.patientId;
  this.appointment.doctorId = this.doctorId;
  console.log("appointment:", this.appointment);
  this.patientService.bookAppointment(this.appointment).subscribe((response) => {
    if (response.correct) {
      alert('Appointment booked successfully!');
      this.router.navigate(['doctor/patient-list']);
    } else {
      alert('Failed to book appointment. Please try again.');
    }
  });
}

navDashboard(): void {
  this.router.navigate(['/doctor/dashboard']);
}

}
