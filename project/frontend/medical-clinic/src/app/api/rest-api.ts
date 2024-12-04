/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2024-12-04 20:01:05.

export interface AppointmentDTO {
    appointmentId: number;
    notes: string;
    visitDescription: string;
    status: string;
    appointmentDate: Date;
    cancellationReason: string;
    doctorName: string;
}

export interface AppointmentFilterDTO {
    appointmentStatus: string;
    startDate: Date;
    endDate: Date;
    sortField: string;
    sortDirection: string;
    page: number;
    size: number;
}

export interface AuthRequestDTO {
    email: string;
    password: string;
}

export interface AuthRequestDTOBuilder {
}

export interface CreateAddressRequestDTO {
    country: string;
    city: string;
    street: string;
    zipCode: string;
    localNumber: string;
    province: string;
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

export interface CreateHealthDetailsRequestDTO {
    bloodType: string;
    allergies: string;
    chronicConditions: string;
    medications: string;
    notes: string;
    emergencyContactPhone: string;
    emergencyContactName: string;
    patientId: number;
}

export interface CreatePatientResponseDTO {
    name: string;
    secondeName: string;
    correct: boolean;
}

export interface CreatePrescriptionRequestDTO {
    appointmentId: number;
    medicationName: string;
    instruction: string;
    quantitiy: string;
}

export interface DoctorForListResponseDTO {
    id: number;
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

export interface HealthDetailsResponseDTO {
    id: number;
    bloodType: string;
    allergies: string;
    chronicConditions: string;
    medications: string;
    notes: string;
    emergencyContactPhone: string;
    emergencyContactName: string;
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

export interface PrescriptionForListDTO {
    id: number;
    medicationName: string;
    instruction: string;
    quantity: string;
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

export interface Prescription extends BaseEntity {
    medicationName: string;
    instruction: string;
    quantity: string;
    appointment: Appointment;
}

export interface Page<T> extends Slice<T> {
    totalElements: number;
    totalPages: number;
}

export interface Appointment extends BaseEntity {
    notes: string;
    description: string;
    status: string;
    appointmentType: AppointmentType;
    appointmentDate: Date;
    appointmentTime: Date;
    cancellationReason: string;
    patient: Patient;
    doctor: Doctor;
    perscriptionList: Prescription[];
}

export interface BaseEntity {
    id: number;
}

export interface Sort extends Streamable<Order>, Serializable {
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    offset: number;
    sort: Sort;
    unpaged: boolean;
    paged: boolean;
    pageSize: number;
    pageNumber: number;
}

export interface AppointmentType extends BaseEntity {
    name: string;
    price: number;
}

export interface Patient extends User {
    insuranceNumber: string;
    address: Address;
}

export interface Doctor extends User {
    medicalLicense: string;
    specialization: string;
}

export interface Serializable {
}

export interface Slice<T> extends Streamable<T> {
    size: number;
    content: T[];
    number: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    pageable: Pageable;
}

export interface Role extends BaseEntity {
    name: string;
}

export interface Address extends BaseEntity {
    city: string;
    street: string;
    localNumber: string;
    zipCode: string;
    country: string;
    province: string;
}

export interface GrantedAuthority extends Serializable {
    authority: string;
}

export interface User extends BaseEntity, UserDetails {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    birthDate: Date;
    gender: GenderEnum;
    role: Role;
}

export interface Streamable<T> extends Iterable<T>, Supplier<Stream<T>> {
    empty: boolean;
}

export interface Order extends Serializable {
    direction: Direction;
    property: string;
    ignoreCase: boolean;
    nullHandling: NullHandling;
    descending: boolean;
    ascending: boolean;
}

export interface UserDetails extends Serializable {
    enabled: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    password: string;
    username: string;
    authorities: GrantedAuthority[];
    accountNonLocked: boolean;
}

export interface Iterable<T> {
}

export interface Supplier<T> {
}

export interface Stream<T> extends BaseStream<T, Stream<T>> {
}

export interface BaseStream<T, S> extends AutoCloseable {
    parallel: boolean;
}

export interface AutoCloseable {
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
     * HTTP POST /api/appointment/appointments/patient/{id}
     * Java method: uwm.backend.medicalclinic.controller.AppointmentController.listFilteredAppointmentsForPatient
     */
    listFilteredAppointmentsForPatient(id: number, filter: AppointmentFilterDTO): RestResponse<Page<AppointmentDTO>> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/appointment/appointments/patient/${id}`, data: filter });
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
     * HTTP POST /api/health-details/create
     * Java method: uwm.backend.medicalclinic.controller.HealthDetailsController.createHealthDetails
     */
    createHealthDetails(data: CreateHealthDetailsRequestDTO): RestResponse<any> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/health-details/create`, data: data });
    }

    /**
     * HTTP DELETE /api/health-details/delete/{id}
     * Java method: uwm.backend.medicalclinic.controller.HealthDetailsController.deleteHealthDetails
     */
    deleteHealthDetails$DELETE$api_healthdetails_delete_id(id: number): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`api/health-details/delete/${id}` });
    }

    /**
     * HTTP GET /api/health-details/details/{id}
     * Java method: uwm.backend.medicalclinic.controller.HealthDetailsController.getHealthDetails
     */
    getHealthDetails(id: number): RestResponse<HealthDetailsResponseDTO> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/health-details/details/${id}` });
    }

    /**
     * HTTP PUT /api/health-details/update/{id}
     * Java method: uwm.backend.medicalclinic.controller.HealthDetailsController.updateHealthDetails
     */
    updateHealthDetails(id: number, data: CreateHealthDetailsRequestDTO): RestResponse<any> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`api/health-details/update/${id}`, data: data });
    }

    /**
     * HTTP GET /api/patients/info/{id}
     * Java method: uwm.backend.medicalclinic.controller.PatientController.getPatientInfo
     */
    getPatientInfo(id: number): RestResponse<PatientInfoDTO> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/patients/info/${id}` });
    }

    /**
     * HTTP GET /api/prescriptions/appointment/list/{id}
     * Java method: uwm.backend.medicalclinic.controller.PrescriptionsController.listPrescriptionForAppointment
     */
    listPrescriptionForAppointment(id: number): RestResponse<PrescriptionForListDTO[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/prescriptions/appointment/list/${id}` });
    }

    /**
     * HTTP POST /api/prescriptions/create
     * Java method: uwm.backend.medicalclinic.controller.PrescriptionsController.createPrescription
     */
    createPrescription(data: CreatePrescriptionRequestDTO): RestResponse<Prescription> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/prescriptions/create`, data: data });
    }

    /**
     * HTTP DELETE /api/prescriptions/delete/{id}
     * Java method: uwm.backend.medicalclinic.controller.PrescriptionsController.deleteHealthDetails
     */
    deleteHealthDetails$DELETE$api_prescriptions_delete_id(id: number): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`api/prescriptions/delete/${id}` });
    }

    /**
     * HTTP GET /api/prescriptions/patient/{id}
     * Java method: uwm.backend.medicalclinic.controller.PrescriptionsController.listPrescriptionForPatient
     */
    listPrescriptionForPatient(id: number): RestResponse<PrescriptionForListDTO[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/prescriptions/patient/${id}` });
    }

    /**
     * HTTP PUT /api/prescriptions/update/{id}
     * Java method: uwm.backend.medicalclinic.controller.PrescriptionsController.modifyPrescription
     */
    modifyPrescription(id: number, data: CreatePrescriptionRequestDTO): RestResponse<Prescription> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`api/prescriptions/update/${id}`, data: data });
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

export type Direction = "ASC" | "DESC";

export type NullHandling = "NATIVE" | "NULLS_FIRST" | "NULLS_LAST";

function uriEncoding(template: TemplateStringsArray, ...substitutions: any[]): string {
    let result = "";
    for (let i = 0; i < substitutions.length; i++) {
        result += template[i];
        result += encodeURIComponent(substitutions[i]);
    }
    result += template[template.length - 1];
    return result;
}
