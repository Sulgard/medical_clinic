package uwm.backend.medicalclinic.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
public class BillingFilterDTO {
    private Boolean paid;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime startDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime endDate;

    private String sortField = "billingDate";
    private String sortDirection = "desc";
    private int page = 0;
    private int size = 10;
}
