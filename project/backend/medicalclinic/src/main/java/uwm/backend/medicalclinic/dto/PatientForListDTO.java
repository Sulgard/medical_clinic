package uwm.backend.medicalclinic.dto;

import lombok.Data;
import uwm.backend.medicalclinic.model.Patient;

@Data
public class PatientForListDTO {
    private Long id;
    private String fullName;
    private String phoneNumber;
    private String email;

    public PatientForListDTO(Patient patient) {
        this.id = patient.getId();
        this.fullName = patient.getFullName();
        this.phoneNumber = patient.getPhoneNumber();
        this.email = patient.getEmail();
    }
}
