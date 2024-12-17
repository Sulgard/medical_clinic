package uwm.backend.medicalclinic.dto;

import lombok.Data;

@Data
public class DoctorFilterDTO {

    private String specialization;
    private String name;
    private String sortField = "specialization";
    private String sortDirection = "desc";
    private int page = 0;
    private int size = 10;
}
