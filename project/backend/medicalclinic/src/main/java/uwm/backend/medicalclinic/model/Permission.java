package uwm.backend.medicalclinic.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import uwm.backend.medicalclinic.enums.PermissionEnum;

import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "permissions", schema = "medical")
public class Permission extends BaseEntity implements GrantedAuthority {
    private String name;
    private String description;

    @ManyToMany(mappedBy = "permissions")
    private Set<Role> roles;

    @Override
    public String getAuthority() {
        return name;
    }
}
