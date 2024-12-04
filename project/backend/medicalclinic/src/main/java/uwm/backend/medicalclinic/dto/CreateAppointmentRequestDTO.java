package uwm.backend.medicalclinic.dto;

import lombok.Data;

@Data
public class CreateAppointmentRequestDTO {
    private String appointmentDate;
    private String appointmentTime;
    private String appointmentReason;
    private Long appointmentTypeId;
    private Long patientId;
    private Long doctorId;
}
