package uwm.backend.medicalclinic.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class DoctorForListResponseDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String specialization;
    private String phoneNumber;
}
