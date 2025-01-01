package uwm.backend.medicalclinic.dto;

import lombok.Data;

@Data
public class EditContactDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
}
