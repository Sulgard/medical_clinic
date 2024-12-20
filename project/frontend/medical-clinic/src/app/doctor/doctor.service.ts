import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment, AppointmentDTO, DoctorForListDTO, DoctorInfoDTO, DoctorListDTO, MedicineDTO, Prescription } from '../api/rest-api';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }


  listAppointmentsForDocotr(doctorId: number): Observable<any> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`http://localhost:8080/api/appointment/doctors/${doctorId}`, {headers});
  }

  getAppointmentById(appointmentId: number): Observable<AppointmentDTO> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<AppointmentDTO>(`http://localhost:8080/api/appointment/appointments/${appointmentId}`, {headers});
  }

  manageAppointment(appointmentId: number, data: AppointmentDTO): Observable<Appointment>{
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Appointment>(`http://localhost:8080/api/appointment/appointments/${appointmentId}/manage`, data, {headers})
  }

  listDoctors(filter: any): Observable<DoctorListDTO> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`http://localhost:8080/api/doctors/list`, filter,  { headers });
  }

  listPatients(filter: any): Observable<DoctorListDTO> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`http://localhost:8080/api/patients/list`, filter,  { headers });
  }



  getDoctorDetails(id: number): Observable<DoctorInfoDTO> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`http://localhost:8080/api/doctors/info/${id}`, {headers});
  }

  addPrescription(payload: any): Observable<Prescription> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`http://localhost:8080/api/prescriptions/create`, payload, {headers})
  }

  deletePrescription(prescriptionId: number): Observable<any> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`http://localhost:8080/api/prescriptions/delete/${prescriptionId}`, {headers})
  }

  listPrescriptions(appointmentId: number): Observable<any[]> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`http://localhost:8080/api/prescriptions/appointment/list/${appointmentId}`, {headers})
  }

  listMedications(): Observable<MedicineDTO[]> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`http://localhost:8080/api/medicine/list`, {headers});
  }
}
