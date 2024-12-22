package uwm.backend.medicalclinic.dto;

import lombok.Data;

@Data
public class PrescriptionResponseDTO {
    Long id;
    Long medicationId;
    Long appointmentId;
    String medicationName;
    String instruction;
    String quantity;
}
