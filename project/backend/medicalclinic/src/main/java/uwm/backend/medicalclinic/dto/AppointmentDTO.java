package uwm.backend.medicalclinic.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AppointmentDTO {
    private Long appointmentId;
    private String notes;
    private String visitDescription;
    private String status;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String cancellationReason;
    private String doctorName;
    private String patientName;
}
