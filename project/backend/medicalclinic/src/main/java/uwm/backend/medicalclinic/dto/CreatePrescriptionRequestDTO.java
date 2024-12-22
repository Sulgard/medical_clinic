package uwm.backend.medicalclinic.dto;

import lombok.Data;

@Data
public class CreatePrescriptionRequestDTO {
    private Long appointmentId;
    private Long medicineId;
    private String instruction;
    private String quantity;
}
