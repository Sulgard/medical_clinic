package uwm.backend.medicalclinic.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Predicate;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.dto.*;
import uwm.backend.medicalclinic.enums.StatusType;
import uwm.backend.medicalclinic.model.*;
import uwm.backend.medicalclinic.repository.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class AppointmentService {
    private final AppointmentTypeRepository appointmentTypeRepository;
    private final BillingService billingService;
    private final BillingRepository billingRepository;
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
        //OffsetDateTime dateTime = OffsetDateTime.parse(request.getAppointmentDate(), DateTimeFormatter.ISO_OFFSET_DATE_TIME);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        formatter = formatter.withLocale(Locale.US);

        LocalDate date = LocalDate.parse(request.getAppointmentDate(), formatter);
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

public AppointmentListDTO listFilteredAppointmentsForPatientTwo(Long patientId, AppointmentFilterDTO filter) {
    Pageable pageable = PageRequest.of(
            filter.getPage(),
            filter.getSize(),
            Sort.by(Sort.Direction.fromString(filter.getSortDirection()), filter.getSortField())
    );

    Specification<Appointment> specification = (root, query, criteriaBuilder) -> {
        List<Predicate> predicates = new ArrayList<>();

        predicates.add(criteriaBuilder.equal(root.get("patient").get("id"), patientId));

        if (filter.getAppointmentStatus() != null && !filter.getAppointmentStatus().isEmpty()) {
            predicates.add(criteriaBuilder.equal(root.get("status"), filter.getAppointmentStatus()));
        }

        if (filter.getStartDate() != null) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("appointmentDate"), filter.getStartDate()));
        }
        if (filter.getEndDate() != null) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("appointmentDate"), filter.getEndDate()));
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    };

    Page<Appointment> appointmentPage = appointmentRepository.findAll(specification, pageable);
    List<Appointment> contents = appointmentPage.getContent();
    List<AppointmentForListDTO> contentDTO = new ArrayList<>();
    for (Appointment content : contents ) {
        AppointmentForListDTO element = new AppointmentForListDTO(content);
        contentDTO.add(element);
    }

    AppointmentListDTO result = new AppointmentListDTO();
    result.setContent(contentDTO);
    result.setPageNumber(appointmentPage.getNumber());
    result.setPageSize(appointmentPage.getSize());
    result.setTotalPages(appointmentPage.getTotalPages());
    result.setTotalElements(appointmentPage.getTotalElements());
    return result;
}




    public Appointment manageAppointment(Long appointmentId, String notes) {
        Optional<Appointment> appointment = appointmentRepository.findById(appointmentId);

        if(!appointment.isPresent()) {
            throw new EntityNotFoundException("Appointment not found");
        }

        Appointment appointmentOB = appointment.get();

        appointmentOB.setStatus(StatusType.COMPLETED.name());
        appointmentOB.setNotes(notes);

        Billing billing = billingService.createBillingforAppointment(appointmentOB.getId());
        billingRepository.save(billing);


        return appointmentRepository.save(appointmentOB);
    }

    public AppointmentDTO getAppointment(Long id) {


        Appointment appointmentOB = appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found"));
        AppointmentDTO result = new AppointmentDTO(appointmentOB);
//        result.setAppointmentId(appointmentOB.getId());
//        result.setAppointmentDate(appointmentOB.getAppointmentDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
//        result.setAppointmentTime(appointmentOB.getAppointmentTime().format(DateTimeFormatter.ofPattern("HH:mm")));
//        result.setStatus(appointmentOB.getStatus());
//        result.setNotes(appointmentOB.getNotes());
//        result.setDoctorName(appointmentOB.getDoctor().getFullName());
//        result.setPatientName(appointmentOB.getPatient().getFullName());
//        result.setVisitDescription(appointmentOB.getDescription());
            if (appointmentOB.getCancellationReason() != null && !appointmentOB.getCancellationReason().isEmpty()) {
            result.setCancellationReason(appointmentOB.getCancellationReason());
        }

        return result;
    }

    public List<AppointmentDTO> listAppointments() {
        List<Appointment> appoinmetns = appointmentRepository.findAll();

        List<AppointmentDTO> result = new ArrayList<>();

        for(Appointment appointment: appoinmetns) {
            AppointmentDTO element = new AppointmentDTO(appointment);
//            element.setVisitDescription(appointment.getDescription());
//            element.setAppointmentDate(appointment.getAppointmentDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
//            element.setAppointmentTime(appointment.getAppointmentTime().format(DateTimeFormatter.ofPattern("HH:mm")));
//            element.setStatus(appointment.getStatus());
//            element.setNotes(appointment.getNotes());
//            element.setDoctorName(appointment.getDoctor().getFullName());
//            element.setPatientName(appointment.getPatient().getFullName());
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
            AppointmentDTO element = new AppointmentDTO(appointment);
            element.setAppointmentId(appointment.getId());
            element.setVisitDescription(appointment.getDescription());
//            element.setAppointmentDate(appointment.getAppointmentDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
//            element.setAppointmentTime(appointment.getAppointmentTime().format(DateTimeFormatter.ofPattern("HH:mm")));
//            element.setStatus(appointment.getStatus());
//            element.setNotes(appointment.getNotes());
//            element.setDoctorName(appointment.getDoctor().getFullName());
//            element.setPatientName(appointment.getPatient().getFullName());
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
            AppointmentDTO element = new AppointmentDTO(appointment);
//            element.setAppointmentDate(appointment.getAppointmentDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
//            element.setAppointmentTime(appointment.getAppointmentTime().format(DateTimeFormatter.ofPattern("HH:mm")));
//            element.setStatus(appointment.getStatus());
//            element.setNotes(appointment.getNotes());
//            element.setDoctorName(appointment.getDoctor().getFullName());
//            element.setPatientName(appointment.getPatient().getFullName());
            if (appointment.getCancellationReason() != null && !appointment.getCancellationReason().isEmpty()) {
                element.setCancellationReason(appointment.getCancellationReason());
            }
            result.add(element);
        }

        return result;
    }

    public Appointment cancelAppointment(Long id, CancelAppointmentDTO cancel) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found"));

        if(!appointment.getPatient().getId().equals(cancel.getPatientId())) {
            throw new IllegalStateException("This appointment does not belong to this Patient");
        }

        appointment.setCancellationReason(cancel.getCancelReason());

        appointment.setStatus("CANCELLED");
        return appointmentRepository.saveAndFlush(appointment);
    }

    public List<AppointmentDTO> upcomingPatientAppointments(Long patientId) {
        List<Appointment> filteredAppointments = appointmentRepository.findByPatientIdAndStatusOrderByAppointmentDateAsc(patientId, StatusType.PENDING.name());
        List<AppointmentDTO> result = filteredAppointments.stream().map(AppointmentDTO::new)
        .collect(Collectors.toList());
        return result;
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
