package uwm.backend.medicalclinic.model;


import jakarta.persistence.*;
import lombok.*;
import uwm.backend.medicalclinic.enums.RoleEnum;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "roles", schema = "medical")
public class Role extends BaseEntity {

    @Column(unique = true, nullable = false)
    private String name;
}
