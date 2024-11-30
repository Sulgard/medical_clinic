import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientBookAppointmentComponent } from './patient-book-appointment/patient-book-appointment.component';
import { PatientAppointmentsComponent } from './patient-appointments/patient-appointments.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'book-appointment', component: PatientBookAppointmentComponent },
  {path: 'patient-appointments', component: PatientAppointmentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
