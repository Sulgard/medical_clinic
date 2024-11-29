package uwm.backend.medicalclinic.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class CreateAppointmentRequestDTO {
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String appointmentReason;
    private Long appointmentTypeId;
    private Long patientId;
    private Long doctorId;
}
