package uwm.backend.medicalclinic.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import uwm.backend.medicalclinic.enums.RoleEnum;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "roles")
public class Role extends BaseEntity {
    private RoleEnum name;
}
