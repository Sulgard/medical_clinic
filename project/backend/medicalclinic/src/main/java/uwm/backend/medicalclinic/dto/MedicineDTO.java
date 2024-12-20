package uwm.backend.medicalclinic.dto;

import lombok.Data;
import uwm.backend.medicalclinic.model.Medicine;

@Data
public class MedicineDTO {
    private Long id;
    private String name;

    public MedicineDTO(Medicine medicine) {
        this.id = medicine.getId();
        this.name = medicine.getName();
    }
}
