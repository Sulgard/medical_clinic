package uwm.backend.medicalclinic.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.dto.CreateAppointmentRequestDTO;
import uwm.backend.medicalclinic.dto.CreateAppointmentResponseDTO;
import uwm.backend.medicalclinic.enums.StatusType;
import uwm.backend.medicalclinic.model.Appointment;
import uwm.backend.medicalclinic.model.Doctor;
import uwm.backend.medicalclinic.model.Patient;
import uwm.backend.medicalclinic.repository.AppointmentRepository;
import uwm.backend.medicalclinic.repository.DoctorRepository;
import uwm.backend.medicalclinic.repository.PatientRepository;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AppointmentService {
    AppointmentRepository appointmentRepository;
    PatientRepository patientRepository;
    DoctorRepository doctorRepository;

    public CreateAppointmentResponseDTO createAppointment(CreateAppointmentRequestDTO request) {
        CreateAppointmentResponseDTO result = new CreateAppointmentResponseDTO();
        if(request.getDoctorId() == null || request.getPatientId() == null) {
            result.setCorrect(false);
            return result;
        }

        Optional<Patient> patient = patientRepository.findPatientById(request.getPatientId());
        Optional<Doctor> doctor = doctorRepository.findDoctorById(request.getDoctorId());

        if(!patient.isPresent()) {
            result.setCorrect(false);
            return result;
        }

        if(!doctor.isPresent()) {
            result.setCorrect(false);
            return result;
        }

        Patient patientOB = patient.get();
        Doctor doctorOB = doctor.get();

        Appointment appointmentOB = new Appointment();
        appointmentOB.setAppointmentDate(request.getAppointmentDate());
        appointmentOB.setAppointmentTime(request.getAppointmentTime());
        appointmentOB.setPatient(patientOB);
        appointmentOB.setDoctor(doctorOB);
        appointmentOB.setStatus(StatusType.PENDING);
        if(request.getAppointmentReason().isEmpty() || request.getAppointmentReason() == null){
            appointmentOB.setAppointmentDescription("NO REASON HAS BEEN SET YET.");
        }
        appointmentOB.setAppointmentDescription(request.getAppointmentReason());
        appointmentRepository.saveAndFlush(appointmentOB);

        result.setAppointmentDate(appointmentOB.getAppointmentDate());
        result.setAppointmentTime(appointmentOB.getAppointmentTime());
        result.setCorrect(true);

        return result;
    }
}
