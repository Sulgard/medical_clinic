package uwm.backend.medicalclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uwm.backend.medicalclinic.model.HealthDetails;
import uwm.backend.medicalclinic.model.Patient;

import java.util.Optional;

public interface HealthDetailsRepository extends JpaRepository<HealthDetails, Long> {
    Optional<HealthDetails> findByPatient(Patient patient);
}
