package uwm.backend.medicalclinic.dto;

import lombok.Data;

@Data
public class PatientInfoDTO extends UserInfoDTO {
    String insuranceNumber;
}
