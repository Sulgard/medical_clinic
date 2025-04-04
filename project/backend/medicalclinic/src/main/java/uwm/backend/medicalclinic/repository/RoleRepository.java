package uwm.backend.medicalclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uwm.backend.medicalclinic.model.Role;

import java.util.Optional;


public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
}
