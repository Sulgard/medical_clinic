package uwm.backend.medicalclinic.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "prescriptions", schema = "medical")
public class Prescription extends BaseEntity {
    @Column(name = "medication_name")
    private String medicationName;

    @Column(name = "instruction")
    private String instruction;

    @Column(name = "quantity")
    private String quantity;

    @ManyToOne
    @JoinColumn(name="appointment_id", nullable=false)
    private Appointment appointment;
}
