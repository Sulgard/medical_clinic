import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

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
