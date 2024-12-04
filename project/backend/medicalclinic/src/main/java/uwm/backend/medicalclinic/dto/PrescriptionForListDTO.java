package uwm.backend.medicalclinic.dto;

import lombok.Data;
import uwm.backend.medicalclinic.model.Prescription;

@Data
public class PrescriptionForListDTO {
    private Long id;
    private String medicationName;
    private String instruction;
    private String quantity;

    public PrescriptionForListDTO(Prescription prescription) {
        this.id = prescription.getId();
        this.medicationName = prescription.getMedicationName();
        this.instruction = prescription.getInstruction();
        this.quantity = prescription.getQuantity();
    }
}
