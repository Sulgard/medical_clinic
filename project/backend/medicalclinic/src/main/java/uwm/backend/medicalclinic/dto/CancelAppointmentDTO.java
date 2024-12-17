package uwm.backend.medicalclinic.dto;

import lombok.Data;

@Data
public class CancelAppointmentDTO {
    private Long patientId;
    private String cancelReason;
}
