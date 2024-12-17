package uwm.backend.medicalclinic.dto;

import lombok.Data;

import java.util.List;

@Data
public class BillingListDTO {
    private List<BillingDTO> content;
    private int pageNumber;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;
}
