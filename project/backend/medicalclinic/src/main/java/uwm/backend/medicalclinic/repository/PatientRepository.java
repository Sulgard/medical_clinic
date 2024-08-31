package uwm.backend.medicalclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uwm.backend.medicalclinic.model.Patient;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByEmail(String email);
}
