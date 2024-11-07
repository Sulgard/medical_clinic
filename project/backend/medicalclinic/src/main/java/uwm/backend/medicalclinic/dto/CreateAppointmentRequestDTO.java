package uwm.backend.medicalclinic.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateAppointmentRequestDTO {
    private LocalDate appointmentDate;
    private LocalDate appointmentTime;
    private String appointmentReason;
    private Long patientId;
    private Long doctorId;
}
