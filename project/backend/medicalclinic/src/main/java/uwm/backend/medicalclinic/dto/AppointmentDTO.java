package uwm.backend.medicalclinic.dto;

import lombok.*;
import uwm.backend.medicalclinic.model.Appointment;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Data
public class AppointmentDTO {
    private Long appointmentId;
    private String notes;
    private String visitDescription;
    private String status;
    private String appointmentDate;
    private String appointmentTime;
    private String cancellationReason;
    private String doctorName;
    private String patientName;
    private String appointmentType;

    public AppointmentDTO(Appointment appointment) {
        this.appointmentId = appointment.getId();
        this.notes = appointment.getNotes();
        this.visitDescription = appointment.getDescription();
        this.status = appointment.getStatus();
        this.appointmentDate = appointment.getAppointmentDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));;
        this.appointmentTime = appointment.getAppointmentTime().format(DateTimeFormatter.ofPattern("HH:mm"));;
        this.cancellationReason = appointment.getCancellationReason();
        this.doctorName = appointment.getDoctor().getFullName();
        this.patientName = appointment.getPatient().getFullName();
        this.appointmentType = appointment.getAppointmentType().getName();
    }
}
