import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CreateDoctorRequestDTO, DoctorResponseDTO } from '../api/rest-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  createDoctor(createDoctorRequest: CreateDoctorRequestDTO): Observable<DoctorResponseDTO> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<DoctorResponseDTO>('http://localhost:8080/api/doctors/create', createDoctorRequest, { headers });
  }
}
