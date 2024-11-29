package uwm.backend.medicalclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uwm.backend.medicalclinic.model.Appointment;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatientId(Long id);
    List<Appointment> findByDoctorId(Long id);
    List<Appointment> findByAppointmentDateAndAndAppointmentTime(LocalDate date, LocalTime time);
}
