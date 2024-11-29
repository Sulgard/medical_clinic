package uwm.backend.medicalclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uwm.backend.medicalclinic.model.Appointment;
import uwm.backend.medicalclinic.model.AppointmentType;

import java.util.Optional;

public interface AppointmentTypeRepository extends JpaRepository<AppointmentType, Long> {
    Optional<AppointmentType> findById(Long id);
}
