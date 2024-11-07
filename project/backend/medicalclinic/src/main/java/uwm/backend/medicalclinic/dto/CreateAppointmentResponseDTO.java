package uwm.backend.medicalclinic.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateAppointmentResponseDTO {
    private LocalDate appointmentDate;
    private LocalDate appointmentTime;
    private Boolean correct;

}
