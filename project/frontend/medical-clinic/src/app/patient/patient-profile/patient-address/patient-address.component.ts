import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../patient.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { AddressResponseDTO } from '../../../api/rest-api';
import { MaterialModule } from '../../../shared/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-address',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './patient-address.component.html',
  styleUrl: './patient-address.component.css'
})
export class PatientAddressComponent implements OnInit{
  patientAddress: AddressResponseDTO | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private patientService: PatientService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.viewPatientAddress();
  }

  viewPatientAddress(): any {
    const patientId: number = this.authService.getUserId();
    this.patientService.getPatientAddress(patientId).subscribe({
      next: (data: AddressResponseDTO) => {
        this.patientAddress = data;
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
