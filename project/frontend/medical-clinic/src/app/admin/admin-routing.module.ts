import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateDoctorComponent } from './create-doctor/create-doctor.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'create-doctor', component: CreateDoctorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
