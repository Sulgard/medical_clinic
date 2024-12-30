package uwm.backend.medicalclinic.dto;

import lombok.Data;

import java.util.List;

@Data
public class UpdateConfirmationDTO {
    private String message;
    private List<String> updatedFields;

    public UpdateConfirmationDTO(String message, List<String> updatedFields) {
        this.message = message;
        this.updatedFields = updatedFields;
    }
}
