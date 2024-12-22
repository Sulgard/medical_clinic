package uwm.backend.medicalclinic.dto;

import java.util.List;

import lombok.Data;

@Data
public class MedicineListDTO {
    private List<MedicineForListDTO> content;
    private int pageNumber;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;
}
