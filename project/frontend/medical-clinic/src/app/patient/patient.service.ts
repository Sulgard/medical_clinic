import { PatientInfoDTO } from './../api/rest-api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
}
