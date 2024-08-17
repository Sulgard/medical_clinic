package uwm.backend.medicalclinic.dto;

import lombok.Builder;
import uwm.backend.medicalclinic.enums.GenderEnum;

import java.time.LocalDate;

@Builder
public record RegisterPatientDto(
        String email,
        String password,
        String firstName,
        String lastName,
        String phoneNumber,
        GenderEnum gender,
        LocalDate birthDate,
        String insuranceNumber

) {
}
