package uwm.backend.medicalclinic.dto;

import lombok.Data;
import uwm.backend.medicalclinic.model.Prescription;

@Data
public class PrescriptionForListDTO {
    private Long id;
    private Long medicationId;
    private String medicationName;
    private String instruction;
    private String quantity;

    public PrescriptionForListDTO(Prescription prescription) {
        this.id = prescription.getId();
        this.medicationId = prescription.getMedicine().getId();
        this.instruction = prescription.getInstruction();
        this.quantity = prescription.getQuantity();
        this.medicationName = prescription.getMedicine().getName();
    }
}
