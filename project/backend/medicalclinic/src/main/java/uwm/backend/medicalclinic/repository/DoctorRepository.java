package uwm.backend.medicalclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uwm.backend.medicalclinic.model.Doctor;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findDoctorById(Long id);
    Optional<Doctor> findByEmail(String email);
}
