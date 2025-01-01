package uwm.backend.medicalclinic.dto;

import lombok.Data;

@Data
public class DoctorInfoDTO extends UserInfoDTO{
    String specialization;
    String medicalLicense;
    String password;
}
