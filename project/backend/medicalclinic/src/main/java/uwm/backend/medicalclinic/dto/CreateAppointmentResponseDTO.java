package uwm.backend.medicalclinic.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
public class CreateAppointmentResponseDTO {
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private Boolean correct;

}
