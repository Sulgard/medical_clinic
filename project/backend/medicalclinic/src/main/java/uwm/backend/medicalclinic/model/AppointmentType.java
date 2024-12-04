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
@Table(name = "appointment_type", schema = "medical")
public class AppointmentType extends BaseEntity{
    @Column(name = "name", unique = true, nullable = false)
    private String name;

    @Column(name = "price")
    private double price;
}
