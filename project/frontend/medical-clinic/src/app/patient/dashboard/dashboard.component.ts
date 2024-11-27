import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  patientName = 'John Doe';
  upcomingAppointments = [
    { date: new Date(), doctor: 'Dr. Smith' },
    { date: new Date('2024-12-01'), doctor: 'Dr. Adams' }
  ];

  constructor() {}

  ngOnInit(): void {
  
  }

  bookAppointment(): void {
  }

  viewPrescriptions(): void {
  }
}
