package uwm.backend.medicalclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uwm.backend.medicalclinic.model.Prescription;

public interface PrescriptionRepository  extends JpaRepository<Prescription, Long> {
}
