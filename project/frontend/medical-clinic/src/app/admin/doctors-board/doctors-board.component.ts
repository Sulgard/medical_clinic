import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { DoctorService } from '../../doctor/doctor.service';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DoctorInfoComponent } from '../../patient/doctor-info/doctor-info.component';
import { DoctorInfoDTO } from '../../api/rest-api';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-doctors-board',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './doctors-board.component.html',
  styleUrl: './doctors-board.component.css'
})
export class DoctorsBoardComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
    private doctorService: DoctorService,
    private dialog: MatDialog
  ) {}

  doctors: any[] = [];
  totalPages: number = 0;
  totalElements: number = 0;
  currentPage: number = 0;
  isLoading: boolean = false;

  

  filter = {
    name: '',
    specialization: '',
    sortField: 'specialization',
    sortDirection: 'ASC',
    page: 0,
    size: 10
  };

  displayedColumns: string[] = ['fullName', 'medicalLicense', 'specialization', 'actions'];

  ngOnInit(): void {
    this.loadDoctorList();
  }

  loadDoctorList(): void {
    this.isLoading = true;
    this.doctorService.listDoctors(this.filter)
      .subscribe({
        next: (response: any) => {
          // Zawartość odpowiedzi
          console.log("Response:", response);
          this.doctors = response.content || []; // Lista wizyt
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
  
  showDoctorDetails(id: number) {
      this.doctorService.getDoctorDetails(id).subscribe((details: DoctorInfoDTO) => {
        this.dialog.open(DoctorInfoComponent, {
          data: details,
          width: '400px',
        });
      });
  }
  
  applyFilter(): void {
    this.filter.page = 0;
    this.loadDoctorList();
  }

  onPageChange(event: any): void {
    this.filter.page = event.pageIndex;
    this.filter.size = event.pageSize;
    this.loadDoctorList();
  }

  navDashboard(): void {
    this.router.navigate(['/admin/dashboard']);
  }


  navigateCreateDoctor():void {
    this.router.navigate(['admin/create-doctor']);
  }

  deleteDoctorDialog(doctorId: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this doctor account?',
        action: () => this.confirmDeleteDoctor(doctorId)
      }
    });
  }

  confirmDeleteDoctor(doctorId: number) {
    
  }

  logout(): void {
    this.authService.logout();
  }

}
