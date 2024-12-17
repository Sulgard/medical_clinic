package uwm.backend.medicalclinic.dto;

import lombok.Data;
import uwm.backend.medicalclinic.model.Doctor;

@Data
public class DoctorForListDTO {
    private Long id;
    private String fullName;
    private String specialization;
    private String medicalLicense;
    private String phoneNumber;
    private String email;

        public DoctorForListDTO(Doctor doctor) {
        this.id = doctor.getId();
        this.fullName = doctor.getFullName();
        this.medicalLicense = doctor.getMedicalLicense();
        this.specialization = doctor.getSpecialization();
        this.phoneNumber = doctor.getPhoneNumber();
        this.email = doctor.getEmail();
    }
}
