package uwm.backend.medicalclinic.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import uwm.backend.medicalclinic.enums.StatusType;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "doctor_availability", schema = "medical")
public class DoctorAvailability extends BaseEntity {

    @Column(name = "available_date")
    private LocalDate availableDate;

    @Column(name = "available_time")
    private LocalTime availableTime;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;
}
