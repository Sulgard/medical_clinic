package uwm.backend.medicalclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import uwm.backend.medicalclinic.model.Appointment;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long>, JpaSpecificationExecutor<Appointment> {
    List<Appointment> findByPatientId(Long id);
    List<Appointment> findByDoctorId(Long id);
    List<Appointment> findByAppointmentDateAndAndAppointmentTime(LocalDate date, LocalTime time);
}
