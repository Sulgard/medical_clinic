package uwm.backend.medicalclinic.dto;

import lombok.Data;

@Data
public class PasswordChangeRequestDTO {
    private String password;
    private String newPassword;
    private String confirmPassword;
}
