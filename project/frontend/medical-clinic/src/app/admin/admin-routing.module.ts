import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateDoctorComponent } from './create-doctor/create-doctor.component';
import { DoctorsBoardComponent } from './doctors-board/doctors-board.component';
import { PatientsBoardComponent } from './patients-board/patients-board.component';
import { MedicineBoardComponent } from './medicine-board/medicine-board.component';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';
import { MedicineEditComponent } from './medicine-edit/medicine-edit.component';
import { MedicineAddComponent } from './medicine-add/medicine-add.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { PatientEditAddressComponent } from './patient-edit-address/patient-edit-address.component';
import { PatientAddComponent } from './patient-add/patient-add.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'create-doctor', component: CreateDoctorComponent},
  {path: 'doctors-board', component: DoctorsBoardComponent},
  {path: 'patients-board', component: PatientsBoardComponent},
  {path: 'medicine-board', component: MedicineBoardComponent},
  {path: 'doctor-edit/:id', component: DoctorEditComponent},
  {path: 'medicine-edit/:id', component: MedicineEditComponent},
  {path: 'medicine-add', component: MedicineAddComponent},
  {path: 'patient-edit/:id', component: PatientEditComponent},
  {path: 'patient-edit-address/:id', component: PatientEditAddressComponent},
  {path: 'patient-add', component: PatientAddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
