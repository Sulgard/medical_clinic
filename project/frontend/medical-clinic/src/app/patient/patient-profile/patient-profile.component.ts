import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientDetailsComponent } from "./patient-details/patient-details.component";
import { PatientAddressComponent } from "./patient-address/patient-address.component";
import { HealthDetailsComponent } from "./health-details/health-details.component";
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ChangePasswordComponent } from "./change-password/change-password.component";

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    PatientDetailsComponent,
    PatientAddressComponent,
    HealthDetailsComponent,
    ChangePasswordComponent
],
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.css'
})
export class PatientProfileComponent {
  activeTab: string = 'info';

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  navDashboard(): void {
    this.router.navigate(['/patient/dashboard']);
  }

  bookAppointment(): void {
    this.router.navigate(['/patient/book-appointment']);
  }

  viewDoctors(): void {
    this.router.navigate(['/patient/doctors-list']);
  }

  viewBillings(): void {
    this.router.navigate(['/patient/billing-list']);
  }

  viewAppointments(): void {
    this.router.navigate(['/patient/patient-appointments']);
  }

  viewProfile(): void {
    this.router.navigate(['/patient/patient-profile']);
  }


  logout(): void {
    this.authService.logout();
  }

}
