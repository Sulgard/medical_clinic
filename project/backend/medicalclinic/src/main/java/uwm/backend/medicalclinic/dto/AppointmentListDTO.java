package uwm.backend.medicalclinic.dto;

import java.util.List;
import lombok.Data;

@Data
public class AppointmentListDTO {
    private List<AppointmentForListDTO> content;
    private int pageNumber;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;
}
