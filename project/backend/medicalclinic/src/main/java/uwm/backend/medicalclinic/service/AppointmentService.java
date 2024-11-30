package uwm.backend.medicalclinic.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.dto.AppointmentDTO;
import uwm.backend.medicalclinic.dto.CreateAppointmentRequestDTO;
import uwm.backend.medicalclinic.dto.CreateAppointmentResponseDTO;
import uwm.backend.medicalclinic.dto.DoctorForListResponseDTO;
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

        Appointment appointmentOB = new Appointment();
        appointmentOB.setAppointmentDate(request.getAppointmentDate());
        appointmentOB.setAppointmentTime(request.getAppointmentTime());
        appointmentOB.setAppointmentType(appointmentTypeOB);
        appointmentOB.setPatient(patientOB);
        appointmentOB.setDoctor(doctorOB);
        appointmentOB.setStatus("PENDING");
        if(request.getAppointmentReason().isEmpty()){
            appointmentOB.setDescription("NO REASON HAS BEEN SET YET.");
        }
        appointmentOB.setDescription(request.getAppointmentReason());
        appointmentRepository.saveAndFlush(appointmentOB);

        result.setAppointmentDate(appointmentOB.getAppointmentDate());
        result.setAppointmentTime(appointmentOB.getAppointmentTime());
        result.setCorrect(true);

        return result;
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

    public List<DoctorForListResponseDTO> listAvailableDoctors(LocalDate date, LocalTime time) {
        List<Appointment> bookedAppointments = appointmentRepository.findByAppointmentDateAndAndAppointmentTime(date, time);
        List<Doctor> bookedDoctors = bookedAppointments.stream().
                map(Appointment::getDoctor)
                .collect(Collectors.toList());
        return doctorRepository.findAll().stream()
                .filter(doctor -> !bookedDoctors.contains(doctor))
                .map(doctor -> new DoctorForListResponseDTO(
                    doctor.getFirstName(),
                    doctor.getLastName(),
                    doctor.getSpecialization(),
                    doctor.getPhoneNumber()
                ))
                .collect(Collectors.toList());
    }
}
