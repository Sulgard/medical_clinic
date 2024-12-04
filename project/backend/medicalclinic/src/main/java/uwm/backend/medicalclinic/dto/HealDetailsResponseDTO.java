package uwm.backend.medicalclinic.dto;

import lombok.Data;

@Data
public class HealDetailsResponseDTO {
    private Long id;
    private char bloodType;
    private String allergies;
    private String chronicConditions;
    private String medications;
    private String notes;
    private String emergencyContactPhone;
    private String emergencyContactName;
}
