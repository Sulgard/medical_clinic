package uwm.backend.medicalclinic.dto;

import lombok.Data;

@Data
public class PatientFilterDTO {
    private String name;
    private String email;
    private String sortField = "name";
    private String sortDirection = "desc";
    private int page = 0;
    private int size = 10;
}
