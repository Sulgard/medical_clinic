package uwm.backend.medicalclinic.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import uwm.backend.medicalclinic.model.Billing;

import java.util.List;

public interface BillingRepository extends JpaRepository<Billing, Long> {
    List<Billing> findByPatientIdAndPaidFalse(Long patientId);
    Page<Billing> findAll(Specification<Billing> sepcification, Pageable pageable);
}
