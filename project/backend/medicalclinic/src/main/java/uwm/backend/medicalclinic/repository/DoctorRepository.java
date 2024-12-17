package uwm.backend.medicalclinic.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import uwm.backend.medicalclinic.model.Appointment;
import uwm.backend.medicalclinic.model.Doctor;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findDoctorById(Long id);
    Optional<Doctor> findByEmail(String email);
    Page<Doctor> findAll(Specification<Doctor> specification, Pageable pageable);
}
