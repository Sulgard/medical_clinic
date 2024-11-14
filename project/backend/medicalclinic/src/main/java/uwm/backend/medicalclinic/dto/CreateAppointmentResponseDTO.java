package uwm.backend.medicalclinic.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class CreateAppointmentResponseDTO {
    private LocalDateTime appointmentDate;
    private LocalDate appointmentTime;
    private Boolean correct;

}
