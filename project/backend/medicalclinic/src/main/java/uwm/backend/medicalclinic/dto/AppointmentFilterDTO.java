package uwm.backend.medicalclinic.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AppointmentFilterDTO {
    private String appointmentStatus;
    private LocalDate startDate;
    private LocalDate endDate;
    private String sortField = "appointmentDate";
    private String sortDirection = "desc";
    private int page = 0;
    private int size = 10;
}
