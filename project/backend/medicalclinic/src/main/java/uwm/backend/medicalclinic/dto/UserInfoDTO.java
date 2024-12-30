package uwm.backend.medicalclinic.dto;

import lombok.Data;

import java.time.LocalDate;


@Data
public class UserInfoDTO {
    String firstName;
    String lastName;
    String email;
    String phoneNumber;
    LocalDate birthDate;
    String fullName;
    Long id;
}
