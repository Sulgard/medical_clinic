import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../patient.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { HealthDetailsResponseDTO } from '../../../api/rest-api';
import { MaterialModule } from '../../../shared/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-health-details',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './health-details.component.html',
  styleUrl: './health-details.component.css'
})
export class HealthDetailsComponent implements OnInit {
  healthDetails: HealthDetailsResponseDTO | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private patientService: PatientService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.viewPatientHealthDetails();
  }

  viewPatientHealthDetails(): any {
    const patientId: number = this.authService.getUserId();
    this.patientService.getPatientHealthDetails(patientId).subscribe({
      next: (data: HealthDetailsResponseDTO) => {
        this.healthDetails = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching patient info', err);
        this.errorMessage = 'Failed to load patient information';
      this.isLoading = false;
      },
    });
  }

}
