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
@Table(name = "health_details", schema = "medical")
public class HealthDetails extends BaseEntity {
    @Column(name = "blood_type")
    private char bloodType;

    @Column(name = "allergies")
    private String allergies;

    @Column(name = "chronic_conditions")
    private String chronicConditions;

    @Column(name = "medications")
    private String medications;

    @Column(name = "notes")
    private String notes;

    @Column(name = "emergency_contact_phone")
    private String emergencyContactPhone;

    @Column(name = "emergency_contact_name")
    private String emergencyContactName;

    @OneToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
}
