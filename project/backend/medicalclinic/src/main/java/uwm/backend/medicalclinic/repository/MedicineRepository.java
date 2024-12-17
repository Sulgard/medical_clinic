package uwm.backend.medicalclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uwm.backend.medicalclinic.model.Medicine;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {
}
