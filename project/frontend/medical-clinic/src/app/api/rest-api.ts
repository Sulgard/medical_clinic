/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2024-12-03 00:09:25.

export interface AppointmentDTO {
    notes: string;
    visitDescription: string;
    status: string;
    appointmentDate: Date;
    cancellationReason: string;
}

export interface AuthRequestDTO {
    email: string;
    password: string;
}

export interface AuthRequestDTOBuilder {
}

export interface CreateAddressRequestDTO {
    country: string;
    zipCode: string;
    city: string;
    street: string;
    province: string;
    localNumber: string;
}

export interface CreateAppointmentRequestDTO {
    appointmentDate: string;
    appointmentTime: string;
    appointmentReason: string;
    appointmentTypeId: number;
    patientId: number;
    doctorId: number;
}

export interface CreateAppointmentResponseDTO {
    appointmentDate: string;
    appointmentTime: string;
    correct: boolean;
}

export interface CreateDoctorRequestDTO {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: GenderEnum;
    birthDate: Date;
    medicalLicense: string;
    specialization: string;
}

export interface CreatePatientResponseDTO {
    name: string;
    secondeName: string;
    correct: boolean;
}

export interface DoctorForListResponseDTO {
    firstName: string;
    lastName: string;
    specialization: string;
    phoneNumber: string;
}

export interface DoctorInfoDTO extends UserInfoDTO {
    specialization: string;
    medicalLicense: string;
}

export interface DoctorResponseDTO {
    correct: boolean;
    name: string;
}

export interface JwtResponseDTO {
    accessToken: string;
    refreshToken: string;
}

export interface JwtResponseDTOBuilder {
}

export interface PatientInfoDTO extends UserInfoDTO {
    insuranceNumber: string;
}

export interface RefreshTokenRequestDTO {
    refreshToken: string;
}

export interface RefreshTokenRequestDTOBuilder {
}

export interface RegisterPatientDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: GenderEnum;
    birthDate: Date;
    insuranceNumber: string;
    street: string;
    city: string;
    zipCode: string;
    country: string;
    province: string;
    localNumber: string;
}

export interface UserInfoDTO {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    birthDate: Date;
}

export interface HttpClient {

    request<R>(requestConfig: { method: string; url: string; queryParams?: any; data?: any; copyFn?: (data: R) => R; }): RestResponse<R>;
}

export class RestApplicationClient {

    constructor(protected httpClient: HttpClient) {
    }

    /**
     * HTTP GET /api/appointment/appointments
     * Java method: uwm.backend.medicalclinic.controller.AppointmentController.listAppointments
     */
    listAppointments(): RestResponse<any> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/appointment/appointments` });
    }

    /**
     * HTTP GET /api/appointment/appointments/available-doctors
     * Java method: uwm.backend.medicalclinic.controller.AppointmentController.getAvailableDoctors
     */
    getAvailableDoctors(queryParams?: { date?: string; time?: string; }): RestResponse<DoctorForListResponseDTO[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/appointment/appointments/available-doctors`, queryParams: queryParams });
    }

    /**
     * HTTP GET /api/appointment/appointments/patients/{id}
     * Java method: uwm.backend.medicalclinic.controller.AppointmentController.listAppointmentsForPatient
     */
    listAppointmentsForPatient(id: number): RestResponse<any> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/appointment/appointments/patients/${id}` });
    }

    /**
     * HTTP GET /api/appointment/appointments/type
     * Java method: uwm.backend.medicalclinic.controller.AppointmentController.fetchAppointments
     */
    fetchAppointments(): RestResponse<any> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/appointment/appointments/type` });
    }

    /**
     * HTTP GET /api/appointment/appointments/{id}
     * Java method: uwm.backend.medicalclinic.controller.AppointmentController.getAppointment
     */
    getAppointment(id: number): RestResponse<any> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/appointment/appointments/${id}` });
    }

    /**
     * HTTP POST /api/appointment/appointments/{id}/cancel
     * Java method: uwm.backend.medicalclinic.controller.AppointmentController.cancelAppointment
     */
    cancelAppointment(id: number, queryParams: { patientId: number; }): RestResponse<any> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/appointment/appointments/${id}/cancel`, queryParams: queryParams });
    }

    /**
     * HTTP DELETE /api/appointment/appointments/{id}/delete
     * Java method: uwm.backend.medicalclinic.controller.AppointmentController.deleteAppointment
     */
    deleteAppointment(id: number): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`api/appointment/appointments/${id}/delete` });
    }

    /**
     * HTTP POST /api/appointment/create
     * Java method: uwm.backend.medicalclinic.controller.AppointmentController.createAppointment
     */
    createAppointment(request: CreateAppointmentRequestDTO): RestResponse<CreateAppointmentResponseDTO> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/appointment/create`, data: request });
    }

    /**
     * HTTP GET /api/appointment/doctors/{id}
     * Java method: uwm.backend.medicalclinic.controller.AppointmentController.listAppointmentsForDoctor
     */
    listAppointmentsForDoctor(id: number): RestResponse<any> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/appointment/doctors/${id}` });
    }

    /**
     * HTTP POST /api/auth/login
     * Java method: uwm.backend.medicalclinic.controller.AuthenticationController.AuthenticateAndGetToken
     */
    AuthenticateAndGetToken(authRequestDTO: AuthRequestDTO): RestResponse<JwtResponseDTO> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/auth/login`, data: authRequestDTO });
    }

    /**
     * HTTP POST /api/auth/refreshToken
     * Java method: uwm.backend.medicalclinic.controller.AuthenticationController.refreshToken
     */
    refreshToken(refreshTokenRequestDTO: RefreshTokenRequestDTO): RestResponse<JwtResponseDTO> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/auth/refreshToken`, data: refreshTokenRequestDTO });
    }

    /**
     * HTTP POST /api/auth/signup
     * Java method: uwm.backend.medicalclinic.controller.AuthenticationController.registerPatient
     */
    registerPatient(registerPatientDto: RegisterPatientDto): RestResponse<CreatePatientResponseDTO> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/auth/signup`, data: registerPatientDto });
    }

    /**
     * HTTP POST /api/doctors/create
     * Java method: uwm.backend.medicalclinic.controller.DoctorController.createDoctor
     */
    createDoctor(request: CreateDoctorRequestDTO): RestResponse<DoctorResponseDTO> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/doctors/create`, data: request });
    }

    /**
     * HTTP GET /api/doctors/info/{id}
     * Java method: uwm.backend.medicalclinic.controller.DoctorController.getDoctorInfo
     */
    getDoctorInfo(id: number): RestResponse<DoctorInfoDTO> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/doctors/info/${id}` });
    }

    /**
     * HTTP GET /api/patients/info/{id}
     * Java method: uwm.backend.medicalclinic.controller.PatientController.getPatientInfo
     */
    getPatientInfo(id: number): RestResponse<PatientInfoDTO> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/patients/info/${id}` });
    }

    /**
     * HTTP GET /api/users/info/{id}
     * Java method: uwm.backend.medicalclinic.controller.UserController.getUserInfo
     */
    getUserInfo(id: number): RestResponse<any> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/users/info/${id}` });
    }
}

export type RestResponse<R> = Promise<R>;

export type GenderEnum = "MALE" | "FEMALE" | "NONE";

function uriEncoding(template: TemplateStringsArray, ...substitutions: any[]): string {
    let result = "";
    for (let i = 0; i < substitutions.length; i++) {
        result += template[i];
        result += encodeURIComponent(substitutions[i]);
    }
    result += template[template.length - 1];
    return result;
}
