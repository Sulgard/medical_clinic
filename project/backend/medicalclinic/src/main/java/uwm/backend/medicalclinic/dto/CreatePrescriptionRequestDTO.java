package uwm.backend.medicalclinic.dto;

import lombok.Data;

@Data
public class CreatePrescriptionRequestDTO {
    private Long appointmentId;
    private String medicationName;
    private String instruction;
    private String quantitiy;
}
