import { DoctorService } from './../doctor.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentDTO, MedicineDTO, Prescription } from '../../api/rest-api';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { MatDialog } from '@angular/material/dialog';
import { AddPrescriptionDialogComponent } from '../add-prescription-dialog/add-prescription-dialog.component';

@Component({
  selector: 'app-manage-appointment',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './manage-appointment.component.html',
  styleUrl: './manage-appointment.component.css'
})
export class ManageAppointmentComponent implements OnInit {
  appointmentId!: number;
  appointment!: AppointmentDTO;
  appointmentForm: FormGroup;
  availableMedications: MedicineDTO[] = [];
  prescriptions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.appointmentForm = this.formBuilder.group({
      notes: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.appointmentId = +this.route.snapshot.paramMap.get('id')!;
    this.loadAppointmentDetails();
    this.loadMedicine();
    this.loadPrescriptions();
  }

  loadAppointmentDetails(): void {
    this.doctorService.getAppointmentById(this.appointmentId).subscribe((appointment) => {
      this.appointment = appointment;
      this.initializeForm();
    });
  }

  initializeForm(): void {
    this.appointmentForm.setValue({
      notes: this.appointment.notes,
    });
  }

  loadMedicine(): void {
    this.doctorService.listMedications().subscribe((medicine: MedicineDTO[]) => {
      this.availableMedications = medicine;
    })
  }

  loadPrescriptions(): void {
    this.doctorService.listPrescriptions(this.appointmentId).subscribe((data: any[]) => {
      this.prescriptions = data;
    })
  }

  onSubmit(): void {
  this.appointment.notes = this.appointmentForm.value.notes;
  this.doctorService.manageAppointment(this.appointmentId, this.appointment).subscribe({
    next: (response) => {
      if (response) { 
        alert('Appointment updated successfully!');
        this.router.navigate(['/doctor/dashboard']); 
      } else {
        alert('Failed to update appointment. Please try again.');
        this.router.navigate(['/doctor/dashboard']); 
      }
    },
    error: (error) => {
      console.error('Error managing appointment:', error);
      alert('An error occurred while updating the appointment. Please try again.');
    },
    complete: () => {
      console.log('Manage appointment request completed.');
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
        this.prescriptions.push(addedPrescription);
      });
    }
    
  });
}

removePrescription(prescriptionId: number): void {
  this.doctorService.deletePrescription(prescriptionId).subscribe(() => {
    const index = this.prescriptions.findIndex(prescription => prescription.id === prescriptionId);
    if (index !== -1) {
      this.prescriptions.splice(index, 1);
    }
  });
}

}