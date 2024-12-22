package uwm.backend.medicalclinic.dto;

import lombok.Data;

@Data
public class MedicineFilterDTO {
    private String name;
    private String category;
    private String dosageForm;
    private String manufacturer;
    private String sortField = "appointmentDate";
    private String sortDirection = "desc";
    private int page = 0;
    private int size = 10;
}
