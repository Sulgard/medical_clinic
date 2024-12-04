import { Appointment, AppointmentDTO, AppointmentFilterDTO, CreateAppointmentRequestDTO, CreateAppointmentResponseDTO, DoctorForListResponseDTO, PatientInfoDTO } from './../api/rest-api';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Page } from '../shared/Page';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getPatientInfo(patientId: number): Observable<PatientInfoDTO> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<PatientInfoDTO>(`http://localhost:8080/api/patients/info/${patientId}`, { headers });
  }
  
  listAppointmentsForPatient(patientId: number): Observable<any> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`http://localhost:8080/api/appointment/appointments/patients/${patientId}`, {headers});
  }

  bookAppointment(createAppointmentRequest: CreateAppointmentRequestDTO): Observable<CreateAppointmentResponseDTO> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post<CreateAppointmentResponseDTO>(`http://localhost:8080/api/appointment/create`, createAppointmentRequest, {headers});
  }

  getAvailableDoctors(date?: string, time?: string): Observable<DoctorForListResponseDTO[]> { 
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    let params = new HttpParams();
    if (date) params = params.set('date', date);
    if (time) params = params.set('time', time);

    return this.http.get<DoctorForListResponseDTO[]>(
      'http://localhost:8080/api/appointment/appointments/available-doctors', { headers, params });
  }

  fetchAppointmentTypes(): Observable<any[]> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<any>(`http://localhost:8080/api/appointment/appointments/type`, {headers});
  }

  getFilteredAppointmentsForPatient(patientId: number, filter: AppointmentFilterDTO): Observable<Page<Appointment>> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post<Page<Appointment>>(`http://localhost:8080/api/appointment/appointments/patient/${patientId}`, filter, {headers});
  }
}
