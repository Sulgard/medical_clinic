package uwm.backend.medicalclinic.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import uwm.backend.medicalclinic.enums.PermissionEnum;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "permissions")
public class Permission extends BaseEntity {
    private PermissionEnum name;
    private String description;
}
