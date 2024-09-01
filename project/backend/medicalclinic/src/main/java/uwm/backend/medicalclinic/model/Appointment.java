package uwm.backend.medicalclinic.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import uwm.backend.medicalclinic.enums.StatusType;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "appointments")
public class Appointment extends BaseEntity {
    @Column(name = "notes", nullable = true)
    private String notes;

    @Column(name = "appointment_description", nullable = false)
    private String appointmentDescription;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private StatusType status;

    @Column(name = "appointment_date", nullable = false)
    private Date appointmentDate;

    @Column(name = "appointment_time", nullable = false)
    private Date appointmentTime;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

}
