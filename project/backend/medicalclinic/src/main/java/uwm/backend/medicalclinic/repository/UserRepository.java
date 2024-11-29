package uwm.backend.medicalclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import uwm.backend.medicalclinic.model.Role;
import uwm.backend.medicalclinic.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    @Query("SELECT r.name FROM User u JOIN u.role r WHERE u.email = :email")
    String findRoleByUsername(@Param("email") String email);
    Optional<User> getUserById(Long id);
    Optional<User> findByRole(Role role);
}
