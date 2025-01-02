import { Component } from '@angular/core';
import { DoctorService } from '../../doctor/doctor.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { MedicineForListDTO } from '../../api/rest-api';
import { MedicineDialogInfoComponent } from '../medicine-dialog-info/medicine-dialog-info.component';

@Component({
  selector: 'app-medicine-board',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './medicine-board.component.html',
  styleUrl: './medicine-board.component.css'
})
export class MedicineBoardComponent {
 medicines: any[] = [];
  totalPages: number = 0;
  totalElements: number = 0;
  currentPage: number = 0;
  isLoading: boolean = false;

  manufacturerOptions: string[] = [
    'Pharmaceuticals',
    'AllergyFree Meds',
    'CardioCare',
    'Diabeto Inc.',
    'GastroHealth Pharma',
    'Medico Labs',
    'NutriPlus Labs'
    ];

  categoryOptions: string[] = [
    'Supplement',
    'Antibiotic',
    'Proton Pump Inhibitor',
    'Antidiabetic',
    'Antihypertensive',
    'Antihistamine',
    'Analgesic/Antipyretic'
    ];

  filter = {
    name: '',
    category: '',
    manufacturer: '',
    sortField: 'manufacturer',
    sortDirection: 'ASC',
    page: 0,
    size: 10
  };
  
  displayedColumns: string[] = ['name', 'manufacturer', 'category', 'actions'];

  constructor(
    private doctorService: DoctorService,
    private router: Router,
    private dialog: MatDialog,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
      this.loadMedicineList();
  }

  loadMedicineList(): void {
    this.isLoading = true;
    this.doctorService.listFilteredMedications(this.filter)
      .subscribe({
        next: (response: any) => {
          console.log("Response:", response);
          this.medicines = response.content || [];
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
    this.loadMedicineList();
  }

  onPageChange(event: any): void {
    this.filter.page = event.pageIndex;
    this.filter.size = event.pageSize;
    this.loadMedicineList();
  }

  navDashboard(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  navigateToCreateMedicine(): void { 
    this.router.navigate(['/admin/medicine-add']);
  }

showMedicineDetails(medicineId: number): void {
  this.adminService.getMedicineInfo(medicineId).subscribe((details: MedicineForListDTO) => {
    this.dialog.open(MedicineDialogInfoComponent, {
      data: details,
      width: '400px',
    })
  });
  }

  navigateToEditMedicine(medicineId: number): void {
    this.router.navigate([`/admin/medicine-edit/${medicineId}`]);
  }

  deleteMedicineDialog(medicineId: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this medicine?',
        action: () => this.confirmDeleteMedcine(medicineId)
      }
    });
  }

  confirmDeleteMedcine(medicineId: number): void {
    this.isLoading = true;
    this.adminService.deleteMedicine(medicineId).subscribe({
      next: (response) => {
        if (response.message) {
          this.snackBar.open('Account deleted successfully!', 'Close', { duration: 3000 });
          this.loadMedicineList();
        } else {
          this.snackBar.open('Failed to delete account. Please try again.', 'Close', { duration: 3000 });
        }
      },
      error: (err) => {
        console.error('Failed to delete doctor:', err);
        this.snackBar.open('An error occurred. Please try again later.', 'Close', { duration: 3000 });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
