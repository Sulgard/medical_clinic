package uwm.backend.medicalclinic.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
public class AppointmentFilterDTO {
    private String appointmentStatus;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;
    private String sortField = "appointmentDate";
    private String sortDirection = "desc";
    private int page = 0;
    private int size = 10;
}
