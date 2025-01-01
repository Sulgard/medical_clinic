import { AddressResponseDTO, Appointment, AppointmentDTO, AppointmentFilterDTO, Billing, BillingDTO, BillingFilterDTO, BillingForListDTO, BillingListDTO, CreateAddressRequestDTO, CreateAppointmentRequestDTO, CreateAppointmentResponseDTO, DoctorForListResponseDTO, EditContactDTO, HealthDetailsResponseDTO, PatientInfoDTO, PrescriptionForListDTO, UpdateConfirmationDTO } from './../api/rest-api';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

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

  getPatientAddress(patientId: number): Observable<AddressResponseDTO> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<AddressResponseDTO>(`http://localhost:8080/api/address/patient/${patientId}`, { headers });
  }

  editPatientAddress(patientId: number, payload: CreateAddressRequestDTO): Observable<UpdateConfirmationDTO> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<UpdateConfirmationDTO>(`http://localhost:8080/api/address/patient/${patientId}/edit`, payload, { headers });
  }

  editContactInfo(patientId: number, payload: EditContactDTO): Observable<UpdateConfirmationDTO> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<UpdateConfirmationDTO>(`http://localhost:8080/api/patients/contact/${patientId}/edit`, payload, { headers });
  }

  getPatientHealthDetails(patientId: number): Observable<HealthDetailsResponseDTO> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<HealthDetailsResponseDTO>(`http://localhost:8080/api/health-details/details/${patientId}`, { headers });
  }

  editPatientHealthDetails(patientId: number, data: any): Observable<any> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<HealthDetailsResponseDTO>(`http://localhost:8080/api/health-details/update/${patientId}`, data, { headers });
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

  getFilteredAppointmentsForPatient(patientId: number, filter: any): Observable<HttpResponse<AppointmentDTO[]>> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.post<AppointmentDTO[]>(
      `http://localhost:8080/api/appointment/appointments/patient/${patientId}`,
      filter,
      { headers, observe: 'response' }
    );
  }

  getPrescriptionListOfAppointment(appointmentId: number): Observable<PrescriptionForListDTO[]> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<any>(
      `http://localhost:8080/api/prescriptions/appointment/list/${appointmentId}`,
      { headers}
    );
  }

  getAppointments2(patientId: number, filter: any): Observable<any> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.post<any>(
      `http://localhost:8080/api/appointment/appointments/patient2/${patientId}`,
      filter,
      { headers }
    );
  }

  getAppointmentDetails(appointmentId: number): Observable<AppointmentDTO> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`http://localhost:8080/api/appointment/appointments/${appointmentId}`, { headers });
  }

  cancelAppointment(appointmentId: number, cancelReason: any): Observable<Appointment> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`http://localhost:8080/api/appointment/appointments/${appointmentId}/cancel`, cancelReason, { headers })
  }

  getUpcoming(patientId: number): Observable<any> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`http://localhost:8080/api/appointment/appointments/upcoming/${patientId}`, { headers })
  }

  getPendingCharges(patientId: number): Observable<BillingForListDTO[]> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`http://localhost:8080/api/billing/upcoming/${patientId}`, { headers })
  }

  getBillingDetails(billingId: number): Observable<BillingDTO> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`http://localhost:8080/api/billing/details/${billingId}`, { headers })
  }

  getBillingsList(patientId: number, filter: any): Observable<BillingListDTO> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`http://localhost:8080/api/billing/list/patient/${patientId}`, filter, { headers })
  }

  payForAppointment(billingId: number): Observable<Billing> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`http://localhost:8080/api/billing/pay/${billingId}`, {}, { headers })
  }

  getFilteredAppointmentsForPatient2(patientId: number, filter: any): Observable<any> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    let params = new HttpParams();
    if (filter.appointmentStatus) {
      params = params.set('appointmentStatus', filter.appointmentStatus);
    }
    if (filter.startDate) {
      params = params.set('startDate', filter.startDate);
    }
    if (filter.endDate) {
      params = params.set('endDate', filter.endDate);
    }
    if (filter.page) {
      params = params.set('page', filter.page); 
    }
    if (filter.size) {
      params = params.set('size', filter.size);
    }
    if (filter.sortField) {
      params = params.set('sortField', filter.sortField);
    }
    if (filter.sortDirection) {
      params = params.set('sortDirection', filter.sortDirection);
    }
  
    return this.http.get<any>(`http://localhost:8080/api/appointment/appointments/patienttwo/${patientId}`, {
      headers: headers,
      params: params
    });
  }
}
