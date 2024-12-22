package uwm.backend.medicalclinic.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import uwm.backend.medicalclinic.model.Medicine;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    Page<Medicine> findAll(Specification<Medicine> specification, Pageable pageable);
}
