package uwm.backend.medicalclinic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "doctors")
public class Doctor extends User{

    @Column(name = "medical_license", unique = true, nullable = false)
    private String medicalLicense;

    @Column(name = "specialization", nullable = false)
    private String specialization;
}
