package uwm.backend.medicalclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uwm.backend.medicalclinic.model.HealthDetails;

public interface HealthDetailsRepository extends JpaRepository<HealthDetails, Long> {
}
