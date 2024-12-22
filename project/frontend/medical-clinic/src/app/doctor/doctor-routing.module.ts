import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { ManageAppointmentComponent } from './manage-appointment/manage-appointment.component';
import { MedicineListComponent } from './medicine-list/medicine-list.component';

const routes: Routes = [
  {path: 'dashboard', component: DoctorDashboardComponent},
  {path: 'profile', component: DoctorProfileComponent},
  {path: 'patient-list', component: PatientListComponent},
  {path: 'appointment-list', component: AppointmentListComponent},
  {path: 'manage-appointment/:id', component: ManageAppointmentComponent},
  {path: 'medicine-list', component: MedicineListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
