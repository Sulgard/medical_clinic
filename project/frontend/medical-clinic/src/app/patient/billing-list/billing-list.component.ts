import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { BillingDTO, CreateAppointmentRequestDTO } from '../../api/rest-api';
import { MatDialog } from '@angular/material/dialog';
import { BillingDetailsDialogComponent } from '../billing-details-dialog/billing-details-dialog.component';

@Component({
  selector: 'app-billing-list',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './billing-list.component.html',
  styleUrl: './billing-list.component.css'
})
export class BillingListComponent implements OnInit{
  billings: any[] = [];
  totalPages: number = 0;
  totalElements: number = 0;
  currentPage: number = 0;
  isLoading: boolean = false;
  
  filter = {
    paid: null,
    startDate: '',
    endDate: '',
    sortField: 'billingDate',
    sortDirection: 'desc',
    page: 0,
    size: 10
  };
  
  displayedColumns: string[] = ['billingDate', 'paymentDate', 'amount', 'paymentStatus', 'actions'];
  
  constructor(
    private patientService: PatientService,
    private fb: FormBuilder, 
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router) {}

  ngOnInit(): void {
    this.loadBillings();
  }

  showBillingDetails(id: number) {
    console.log("ID: ", id);
      this.patientService.getBillingDetails(id).subscribe((details: BillingDTO) => {
        this.dialog.open(BillingDetailsDialogComponent, {
          data: details,
          width: '400px',
        });
      });
  }

  loadBillings(): void {
    const patientId = this.authService.getUserId();
    this.isLoading = true;
    this.patientService.getBillingsList(patientId, this.filter)
      .subscribe({
        next: (response: any) => {
          // Zawartość odpowiedzi
          console.log("Response:", response);
          this.billings = response.content || [];
          this.totalPages = response.totalPages;
          console.log("total Pages:", this.totalPages);
          this.totalElements = response.totalElements
          console.log("total Elements:", this.totalElements);
          this.currentPage = response.currentPage
          console.log("current Page:", this.currentPage);
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Error fetching appointments:', error);
          this.isLoading = false;
        }
      });
  }
  

  applyFilter(): void {
    this.filter.page = 0;
    this.loadBillings();
  }

  onPageChange(event: any): void {
    this.filter.page = event.pageIndex;
    this.filter.size = event.pageSize;
    this.loadBillings();
  }

  navDashboard(): void {
    this.router.navigate(['/patient/dashboard']);
  }
}

