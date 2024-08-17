package uwm.backend.medicalclinic.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import uwm.backend.medicalclinic.enums.PermissionEnum;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "permissions")
public class Permission extends BaseEntity implements GrantedAuthority {
    @Enumerated(EnumType.STRING)
    private PermissionEnum name;
    private String description;

    @Override
    public String getAuthority() {
        return name.name();
    }
}
