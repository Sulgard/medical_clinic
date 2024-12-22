import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DoctorService } from '../doctor.service';
import { MedicineDTO } from '../../api/rest-api';
import { AddPrescriptionDialogComponent } from '../add-prescription-dialog/add-prescription-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-appointment-prescription-list',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './appointment-prescription-list.component.html',
  styleUrl: './appointment-prescription-list.component.css'
})
export class AppointmentPrescriptionListComponent implements OnInit{
  @Input() appointmentId!: number;
  prescriptions: any[] = [];
  availableMedications: MedicineDTO[] = [];

  constructor(
    private doctorService: DoctorService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
    
  ){}
  ngOnInit(): void {
      this.loadPrescriptions();
      this.loadMedicine();
  }

  loadPrescriptions(): void {
    this.doctorService.listPrescriptions(this.appointmentId).subscribe((data: any[]) => {
      this.prescriptions = data;
    })
  }

  loadMedicine(): void {
    this.doctorService.listMedications().subscribe((medicine: MedicineDTO[]) => {
      this.availableMedications = medicine;
    })
  }

  removePrescription(prescriptionId: number): void {
    this.doctorService.deletePrescription(prescriptionId).subscribe(() => {
      const index = this.prescriptions.findIndex(prescription => prescription.id === prescriptionId);
      if (index !== -1) {
        this.prescriptions.splice(index, 1);
      }
    });
  }

  openPrescriptionDialog(): void {
    const dialogRef = this.dialog.open(AddPrescriptionDialogComponent, {
      width: '400px',
      data: { medications: this.availableMedications },
    });
    console.log("LEKI: ", this.availableMedications);
    console.log("Recepty: ", this.prescriptions);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newPrescription: any = {
          appointmentId: this.appointmentId,
          medicineId: result.medicineId,
          instruction: result.instruction,
          quantity: result.quantity,
        };
  
        this.doctorService.addPrescription(newPrescription).subscribe(addedPrescription => {
          console.log("LEKARSTWO: ", addedPrescription);
          this.prescriptions = [...this.prescriptions, addedPrescription];
          this.cdr.detectChanges();
        });
      }
      
    });
  }

}
