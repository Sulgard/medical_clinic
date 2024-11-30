import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';

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
export class DashboardComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private adminService: AdminService
  ){}

  navigateCreateDoctor():void {
    this.router.navigate(['admin/create-doctor']);
  }

  logout():void {
    this.authService.logout();
  }

}
