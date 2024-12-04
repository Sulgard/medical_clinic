import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { AppointmentDTO, AppointmentFilterDTO } from '../../api/rest-api';
import { PatientService } from '../patient.service';
@Component({
  selector: 'app-patient-appointments',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './patient-appointments.component.html',
  styleUrl: './patient-appointments.component.css'
})
export class PatientAppointmentsComponent implements OnInit{
  appointments: AppointmentDTO[] = [];
  totalItems = 0; // Liczba wszystkich rekordów
  currentPage = 0;
  pageSize = 10;
  filterForm!: FormGroup;

  constructor(private patientService: PatientService, private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      appointmentStatus: [''],
      startDate: [''],
      endDate: [''],
      sortField: ['appointmentDate'],
      sortDirection: ['DESC']
    });

    this.loadAppointments(); // Załaduj domyślne dane
  }


  loadAppointments(): void {
    const filters = this.filterForm.value;
    const patientId = this.authService.getUserId();
  
    const filter: AppointmentFilterDTO = {
      page: this.currentPage,
      size: this.pageSize,
      sortField: filters.sortField,
      sortDirection: filters.sortDirection,
      appointmentStatus: filters.appointmentStatus,
      startDate: filters.startDate,
      endDate: filters.endDate
    };
  
    this.patientService.getFilteredAppointmentsForPatient(patientId, filter)
      .subscribe((appointments: AppointmentDTO[]) => {
        this.appointments = appointments;
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadAppointments();
  }

  applyFilters(): void {
    this.currentPage = 0; // Resetuj stronę przy zmianie filtrów
    this.loadAppointments();
  }

  clearFilters(): void {
    this.filterForm.reset({
      doctorStatus: '',
      startDate: '',
      endDate: '',
      sortField: 'appointmentDate',
      sortDirection: 'desc'
    });
    this.loadAppointments(); // Odśwież dane bez filtrów
  }
}
