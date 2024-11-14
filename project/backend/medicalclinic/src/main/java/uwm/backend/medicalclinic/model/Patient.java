package uwm.backend.medicalclinic.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "patients", schema = "medical")
public class Patient extends User{

    @Column(name = "insurance_number", nullable = false)
    private String insuranceNumber;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;
}
