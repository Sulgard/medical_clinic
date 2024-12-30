import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateDoctorComponent } from './create-doctor/create-doctor.component';
import { DoctorsBoardComponent } from './doctors-board/doctors-board.component';
import { PatientsBoardComponent } from './patients-board/patients-board.component';
import { MedicineBoardComponent } from './medicine-board/medicine-board.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'create-doctor', component: CreateDoctorComponent},
  {path: 'doctors-board', component: DoctorsBoardComponent},
  {path: 'patients-board', component: PatientsBoardComponent},
  {path: 'medicine-board', component: MedicineBoardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
