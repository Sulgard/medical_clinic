package uwm.backend.medicalclinic.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class CreateAppointmentRequestDTO {
    private LocalDateTime appointmentDate;
    private String appointmentReason;
    private Long patientId;
    private Long doctorId;
}
