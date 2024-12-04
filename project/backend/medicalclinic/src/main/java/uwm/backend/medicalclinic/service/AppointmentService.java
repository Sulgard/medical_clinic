package uwm.backend.medicalclinic.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Predicate;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.dto.*;
import uwm.backend.medicalclinic.enums.StatusType;
import uwm.backend.medicalclinic.model.Appointment;
import uwm.backend.medicalclinic.model.AppointmentType;
import uwm.backend.medicalclinic.model.Doctor;
import uwm.backend.medicalclinic.model.Patient;
import uwm.backend.medicalclinic.repository.AppointmentRepository;
import uwm.backend.medicalclinic.repository.AppointmentTypeRepository;
import uwm.backend.medicalclinic.repository.DoctorRepository;
import uwm.backend.medicalclinic.repository.PatientRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class AppointmentService {
    private final AppointmentTypeRepository appointmentTypeRepository;
    AppointmentRepository appointmentRepository;
    PatientRepository patientRepository;
    DoctorRepository doctorRepository;

    public CreateAppointmentResponseDTO bookAppointment(CreateAppointmentRequestDTO request) {
        CreateAppointmentResponseDTO result = new CreateAppointmentResponseDTO();
        if(request.getDoctorId() == null || request.getPatientId() == null) {
            result.setCorrect(false);
            return result;
        }

        Optional<Patient> patient = patientRepository.findPatientById(request.getPatientId());
        Optional<Doctor> doctor = doctorRepository.findDoctorById(request.getDoctorId());
        Optional<AppointmentType> appointmentType = appointmentTypeRepository.findById(request.getAppointmentTypeId());

        if(patient.isEmpty()) {
            throw new EntityNotFoundException("Patient not found");
        }

        if(doctor.isEmpty()) {
            throw new EntityNotFoundException("Doctor not found");
        }

        if(appointmentType.isEmpty()) {
            throw new EntityNotFoundException("Appointment type not found");
        }

        Patient patientOB = patient.get();
        Doctor doctorOB = doctor.get();
        AppointmentType appointmentTypeOB = appointmentType.get();
        OffsetDateTime dateTime = OffsetDateTime.parse(request.getAppointmentDate(), DateTimeFormatter.ISO_OFFSET_DATE_TIME);

        LocalDate date = dateTime.toLocalDate();
        LocalTime time = LocalTime.parse(request.getAppointmentTime(), DateTimeFormatter.ISO_LOCAL_TIME);

        Appointment appointmentOB = new Appointment();
        appointmentOB.setAppointmentDate(date);
        appointmentOB.setAppointmentTime(time);
        appointmentOB.setAppointmentType(appointmentTypeOB);
        appointmentOB.setPatient(patientOB);
        appointmentOB.setDoctor(doctorOB);
        appointmentOB.setStatus("PENDING");
        if(request.getAppointmentReason().isEmpty()){
            appointmentOB.setDescription("NO REASON HAS BEEN SET YET.");
        }
        appointmentOB.setDescription(request.getAppointmentReason());
        appointmentRepository.saveAndFlush(appointmentOB);

        result.setAppointmentDate(request.getAppointmentDate());
        result.setAppointmentTime(request.getAppointmentTime());
        result.setCorrect(true);

        return result;
    }

public Page<Appointment> listFilteredAppointmentsForPatient(Long patientId, AppointmentFilterDTO filter) {
    Pageable pageable = PageRequest.of(
            filter.getPage(),
            filter.getSize(),
            Sort.by(Sort.Direction.fromString(filter.getSortDirection()), filter.getSortField()));

    Specification<Appointment> specification = (root, query, criteriaBuilder) -> {
        List<Predicate> predicates = new ArrayList<>();

        if (filter.getAppointmentStatus() != null && !filter.getAppointmentStatus().isEmpty()) {
            predicates.add(criteriaBuilder.equal(root.get("status"), filter.getAppointmentStatus()));
        }

        if (filter.getStartDate() != null) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("appointmentDate"), filter.getStartDate()));
        }

        if (filter.getEndDate() != null) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("appointmentDate"), filter.getEndDate()));
        }

        predicates.add(criteriaBuilder.equal(root.get("patient").get("id"), patientId));

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    };

    Page<Appointment> appointments = appointmentRepository.findAll(specification, pageable);

    return appointments;
}



    public Long manageAppointment(Long appointmentId, AppointmentDTO request) {
        Optional<Appointment> appointment = appointmentRepository.findById(appointmentId);

        if(!appointment.isPresent()) {
            throw new EntityNotFoundException("Appointment not found");
        }

        Appointment appointmentOB = appointment.get();

        appointmentOB.setStatus(StatusType.CANCELLED.name());
        appointmentOB.setNotes(request.getNotes());
        appointmentRepository.save(appointmentOB);

        return appointmentOB.getId();
    }

    public AppointmentDTO getAppointment(Long id) {
        AppointmentDTO result = new AppointmentDTO();

        Appointment appointmentOB = appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found"));

        result.setAppointmentDate(appointmentOB.getAppointmentDate());
        result.setStatus(appointmentOB.getStatus());
        result.setNotes(appointmentOB.getNotes());
        result.setVisitDescription(appointmentOB.getDescription());
            if (appointmentOB.getCancellationReason() != null && !appointmentOB.getCancellationReason().isEmpty()) {
            result.setCancellationReason(appointmentOB.getCancellationReason());
        }

        return result;
    }

    public List<AppointmentDTO> listAppointments() {
        List<Appointment> appoinmetns = appointmentRepository.findAll();

        List<AppointmentDTO> result = new ArrayList<>();

        for(Appointment appointment: appoinmetns) {
            AppointmentDTO element = new AppointmentDTO();
            element.setVisitDescription(appointment.getDescription());
            element.setAppointmentDate(appointment.getAppointmentDate());
            element.setStatus(appointment.getStatus());
            element.setNotes(appointment.getNotes());
            if (appointment.getCancellationReason() != null && !appointment.getCancellationReason().isEmpty()) {
                element.setCancellationReason(appointment.getCancellationReason());
            }
            result.add(element);
        }
        return result;
    }

    public List<AppointmentDTO> listAppointmentsForDoctor(Long doctorId) {
        List<Appointment> appoinmetns = appointmentRepository.findByDoctorId(doctorId);
        List<AppointmentDTO> result = new ArrayList<>();

        if(appoinmetns.isEmpty()) {
            return Collections.emptyList();
        }

        for(Appointment appointment: appoinmetns) {
            AppointmentDTO element = new AppointmentDTO();
            element.setVisitDescription(appointment.getDescription());
            element.setAppointmentDate(appointment.getAppointmentDate());
            element.setStatus(appointment.getStatus());
            element.setNotes(appointment.getNotes());
            if (appointment.getCancellationReason() != null && !appointment.getCancellationReason().isEmpty()) {
                element.setCancellationReason(appointment.getCancellationReason());
            }
            result.add(element);
        }

        return result;
    }

     public List<AppointmentDTO> listAppointmentsForPatient(Long patientId) {
        List<Appointment> appoinmetns = appointmentRepository.findByPatientId(patientId);
        List<AppointmentDTO> result = new ArrayList<>();

        if(appoinmetns.isEmpty()) {
            return Collections.emptyList();
        }

        for(Appointment appointment: appoinmetns) {
            AppointmentDTO element = new AppointmentDTO();
            element.setVisitDescription(appointment.getDescription());
            element.setAppointmentDate(appointment.getAppointmentDate());
            element.setStatus(appointment.getStatus());
            element.setNotes(appointment.getNotes());
            if (appointment.getCancellationReason() != null && !appointment.getCancellationReason().isEmpty()) {
                element.setCancellationReason(appointment.getCancellationReason());
            }
            result.add(element);
        }

        return result;
    }

    public Appointment cancelAppointment(Long id, Long patientId) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found"));

        if(!appointment.getPatient().getId().equals(patientId)) {
            throw new IllegalStateException("This appointment does not belong to this Patient");
        }

        appointment.setStatus("CANCELLED");
        return appointmentRepository.saveAndFlush(appointment);
    }

    public void deleteAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointemnt not found"));

        appointmentRepository.delete(appointment);
    }

    public List<DoctorForListResponseDTO> listAvailableDoctors(String dateStr, String timeStr) {
        LocalDate date = LocalDate.parse(dateStr);
        LocalTime time = LocalTime.parse(timeStr);
        List<Appointment> bookedAppointments = appointmentRepository.findByAppointmentDateAndAndAppointmentTime(date, time);
        List<Doctor> bookedDoctors = bookedAppointments.stream().
                map(Appointment::getDoctor)
                .collect(Collectors.toList());
        return doctorRepository.findAll().stream()
                .filter(doctor -> !bookedDoctors.contains(doctor))
                .map(doctor -> new DoctorForListResponseDTO(
                        doctor.getId(),
                    doctor.getFirstName(),
                    doctor.getLastName(),
                    doctor.getSpecialization(),
                    doctor.getPhoneNumber()
                ))
                .collect(Collectors.toList());
    }
}
