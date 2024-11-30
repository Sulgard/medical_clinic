package uwm.backend.medicalclinic.dto;

import lombok.Data;
import uwm.backend.medicalclinic.enums.GenderEnum;

import java.time.LocalDate;

@Data
public class CreateDoctorRequestDTO {
    String email;
    String password;
    String firstName;
    String lastName;
    String phoneNumber;
    GenderEnum gender;
    LocalDate birthDate;
    String medicalLicense;
    String specialization;
}
