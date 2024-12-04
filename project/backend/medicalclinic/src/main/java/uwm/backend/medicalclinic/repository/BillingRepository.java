package uwm.backend.medicalclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uwm.backend.medicalclinic.model.Billing;

public interface BillingRepository extends JpaRepository<Billing, Long> {
}
