import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { AuthRequestDTO, CreatePatientResponseDTO, JwtResponseDTO, RegisterPatientDto } from '../api/rest-api';
import { jwtDecode, JwtPayload } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtTokenSubject = new BehaviorSubject<string | null>(null);
  private currentUserSubject: BehaviorSubject<any>;

  

  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    this.currentUserSubject = new BehaviorSubject<any>(this.getDecodedToken());
  }

  get token$(): Observable<string | null> {
    return this.jwtTokenSubject.asObservable();
  }

  
  loadToken(): string | null {
    return localStorage.getItem('accessToken') || null;
  }

  login(authRequestDTO: AuthRequestDTO): Observable<JwtResponseDTO> {
    return this.http.post<JwtResponseDTO>('http://localhost:8080/api/auth/login', authRequestDTO).pipe(
      tap((response) => {
        this.jwtTokenSubject.next(response.accessToken);
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        this.currentUserSubject.next(this.getDecodedToken());

      })
    )
  }

  logout() {
    this.jwtTokenSubject.next(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.currentUserSubject.next(null);
    this.router.navigate(['auth/login']);
  }

  register(registerPatientDTO: RegisterPatientDto): Observable<CreatePatientResponseDTO> {
    return this.http.post<CreatePatientResponseDTO>('http://localhost:8080/api/auth/signup', registerPatientDTO);
  }

  getDecodedToken(): any | null {
    const token = localStorage.getItem('accessToken');
    if (token) { 
      return jwtDecode<JwtPayload>(token);
    }
    return null;
  }

  getUserRole(): string{
    const decoded = this.getDecodedToken();
    return decoded ? decoded.role: '';
  }

  getUserId(): number{
    const decoded = this.getDecodedToken();
    return decoded ? decoded.userId: null;
  }

  redirectToDashboard(): void {
    const role = this.getUserRole();
    if (role === 'DOCTOR') {
      this.router.navigate(['/doctor/dashboard']);
    } else if (role === 'PATIENT') {
      this.router.navigate(['/patient/dashboard']);
    } else if (role === 'ADMIN') {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }
  
}
