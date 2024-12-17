import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientBookAppointmentComponent } from './patient-book-appointment/patient-book-appointment.component';
import { PatientAppointmentsComponent } from './patient-appointments/patient-appointments.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { BillingListComponent } from './billing-list/billing-list.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'book-appointment', component: PatientBookAppointmentComponent },
  {path: 'patient-appointments', component: PatientAppointmentsComponent},
  {path: 'patient-profile', component: PatientProfileComponent},
  {path: 'doctors-list', component: DoctorsListComponent},
  {path: 'billing-list', component: BillingListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
