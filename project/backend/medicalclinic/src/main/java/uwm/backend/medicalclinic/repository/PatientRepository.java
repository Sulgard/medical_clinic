package uwm.backend.medicalclinic.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import uwm.backend.medicalclinic.model.Doctor;
import uwm.backend.medicalclinic.model.Patient;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByEmail(String email);
    Optional<Patient> findPatientById(Long id);
    Page<Patient> findAll(Specification<Patient> specification, Pageable pageable);
}
