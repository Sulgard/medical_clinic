package uwm.backend.medicalclinic.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import uwm.backend.medicalclinic.model.Appointment;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long>, JpaSpecificationExecutor<Appointment> {
    List<Appointment> findByPatientId(Long id);
    List<Appointment> findByDoctorId(Long id);
    Page<Appointment> findAll(Specification<Appointment> specification, Pageable pageable);
    List<Appointment> findByAppointmentDateAndAndAppointmentTime(LocalDate date, LocalTime time);
    List<Appointment> findByPatientIdAndStatusOrderByAppointmentDateAsc(Long patientId, String status);
    List<Appointment> findByDoctorIdAndAppointmentDate(Long doctorId, LocalDate date);
}
