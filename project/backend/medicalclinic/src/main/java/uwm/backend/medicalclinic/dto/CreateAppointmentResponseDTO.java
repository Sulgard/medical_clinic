package uwm.backend.medicalclinic.dto;

import lombok.Data;

@Data
public class CreateAppointmentResponseDTO {
    private String appointmentDate;
    private String appointmentTime;
    private Boolean correct;

}
