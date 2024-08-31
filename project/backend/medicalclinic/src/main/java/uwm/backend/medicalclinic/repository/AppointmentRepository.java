package uwm.backend.medicalclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uwm.backend.medicalclinic.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}
