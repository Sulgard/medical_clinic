package uwm.backend.medicalclinic.dto;

import uwm.backend.medicalclinic.model.Appointment;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

@Data
public class AppointmentForListDTO {
    private Long id;
    private LocalDate date;
    private LocalTime time;
    private String doctorFullName;
    private String status;

    public AppointmentForListDTO(Appointment appointment) {
        this.id = appointment.getId();
        this.date = appointment.getAppointmentDate();
        this.doctorFullName = appointment.getDoctor().getFullName();
        this.status = appointment.getStatus();
        this.time = appointment.getAppointmentTime();
    }
}
