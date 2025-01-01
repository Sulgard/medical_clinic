import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CreateDoctorRequestDTO, DoctorInfoDTO, DoctorResponseDTO, MedicineDTO, MedicineForListDTO, UpdateConfirmationDTO } from '../api/rest-api';
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
    return this.http.post<DoctorResponseDTO>(`http://localhost:8080/api/doctors/create`, createDoctorRequest, { headers });
  }

  deleteDoctor(doctorId: number): Observable<UpdateConfirmationDTO> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<UpdateConfirmationDTO>(`http://localhost:8080/api/doctors/delete/${doctorId}`, {headers})
  }

  editDoctor(doctorId: number, data: DoctorInfoDTO): Observable<UpdateConfirmationDTO> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<UpdateConfirmationDTO>(`http://localhost:8080/api/doctors/edit/${doctorId}`,data, {headers})
  }

  deleteMedicine(medicineId: number): Observable<UpdateConfirmationDTO> { 
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<UpdateConfirmationDTO>(`http://localhost:8080/api/medicine/delete/${medicineId}`, {headers})
  }

  editMedicine(medicineId: number, data: any): Observable<UpdateConfirmationDTO> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<UpdateConfirmationDTO>(`http://localhost:8080/api/medicine/update/${medicineId}`, data, {headers});
  }

  getMedicineInfo(medicineId: number): Observable<MedicineForListDTO> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<MedicineForListDTO>(`http://localhost:8080/api/medicine/info/${medicineId}`, {headers});
  }

  addMedicine(data: any): Observable<any> {
    const token = this.authService.loadToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`http://localhost:8080/api/medicine/add`, data, {headers});
  }
}
