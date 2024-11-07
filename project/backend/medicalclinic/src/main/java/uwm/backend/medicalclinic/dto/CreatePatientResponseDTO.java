package uwm.backend.medicalclinic.dto;

import lombok.Data;

@Data
public class CreatePatientResponseDTO {
    private String name;
    private String secondeName;
    private Boolean correct;
}
