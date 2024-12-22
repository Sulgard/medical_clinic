package uwm.backend.medicalclinic.dto;

import lombok.Data;

@Data
public class CreateMedicineRequestDTO {
    private String name;
    private String category;
    private String manufacturer;
    private String dosageForm;
}
