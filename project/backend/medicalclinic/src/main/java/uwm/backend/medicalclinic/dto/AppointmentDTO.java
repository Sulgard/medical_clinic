package uwm.backend.medicalclinic.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AppointmentDTO {
    private String notes;
    private String visitDescription;
    private String status;
    private LocalDateTime appointmentDate;
    private String canellationReason;
}
