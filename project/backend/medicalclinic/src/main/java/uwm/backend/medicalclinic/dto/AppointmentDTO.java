package uwm.backend.medicalclinic.dto;

import lombok.*;
import uwm.backend.medicalclinic.model.Appointment;

import java.time.LocalDate;

@Data
public class AppointmentDTO {
    private Long appointmentId;
    private String notes;
    private String visitDescription;
    private String status;
    private LocalDate appointmentDate;
    private String cancellationReason;
    private String doctorName;
}
