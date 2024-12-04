package uwm.backend.medicalclinic.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.dto.CreatePrescriptionRequestDTO;
import uwm.backend.medicalclinic.dto.PrescriptionForListDTO;
import uwm.backend.medicalclinic.model.Appointment;
import uwm.backend.medicalclinic.model.Patient;
import uwm.backend.medicalclinic.model.Prescription;
import uwm.backend.medicalclinic.repository.AppointmentRepository;
import uwm.backend.medicalclinic.repository.PatientRepository;
import uwm.backend.medicalclinic.repository.PrescriptionRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PrescriptionService {

    private final AppointmentRepository appointmentRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final PatientRepository patientRepository;

    public PrescriptionService(AppointmentRepository appointmentRepository, PrescriptionRepository prescriptionRepository, PatientRepository patientRepository) {
        this.appointmentRepository = appointmentRepository;
        this.prescriptionRepository = prescriptionRepository;
        this.patientRepository = patientRepository;
    }

    public Prescription createPrescritpion(CreatePrescriptionRequestDTO request) {
        Optional<Appointment> appointment = appointmentRepository.findById(request.getAppointmentId());

        if(!appointment.isPresent())
        {
            throw new EntityNotFoundException("Appointment not found");
        }

        Appointment appointmentOB = appointment.get();
        Prescription prescription = new Prescription();
        prescription.setAppointment(appointmentOB);
        prescription.setMedicationName(request.getMedicationName());
        prescription.setInstruction(request.getInstruction());
        prescription.setQuantity(request.getQuantitiy());

        return prescriptionRepository.save((prescription));
    }

    public List<PrescriptionForListDTO> listPrescriptionForPatient(Long paitentId) {
        Optional<Patient> patient = patientRepository.findById(paitentId);

        if(!patient.isPresent()) {
            throw new EntityNotFoundException("Patient not found");
        }

        List<Appointment> patientAppointmentList = appointmentRepository.findByPatientId(paitentId);
        List<PrescriptionForListDTO> result = patientAppointmentList.stream()
                .flatMap(appointment -> appointment.getPerscriptionList().stream())
                .map(prescription -> new PrescriptionForListDTO(prescription))
                .collect(Collectors.toList());

        return result;
    }

    public List<Prescription> listAllPrescriptions() {
        return prescriptionRepository.findAll();
    }

    public List<PrescriptionForListDTO> listPrescriptionForAppointment(Long appointmentId) {
        Optional<Appointment> appointment = appointmentRepository.findById(appointmentId);

        if(!appointment.isPresent()) {
            throw new EntityNotFoundException("Appointment not found");
        }

        Appointment appointmentOB = appointment.get();

        List<PrescriptionForListDTO> result = appointmentOB.getPerscriptionList()
                .stream().map(prescription -> new PrescriptionForListDTO(prescription))
                .collect(Collectors.toList());

        return result;
    }

    //TODO : DELTE EXAMPLE
    public void deletePrescription(Long prescriptionId) {
        prescriptionRepository.deleteById(prescriptionId);
    }

    //TODO : MODIFY EXAMPLE
    public Prescription modifyPrescription(Long prescriptionId, CreatePrescriptionRequestDTO changes) {
        Optional<Prescription> prescription = prescriptionRepository.findById(prescriptionId);

        if(!prescription.isPresent()) {
            throw new EntityNotFoundException("Prescription not found");
        }

        Prescription prescriptionOB = prescription.get();

        if (changes.getMedicationName() != null) {
            prescriptionOB.setMedicationName(changes.getMedicationName());
        }

        if (changes.getMedicationName() != null) {
            prescriptionOB.setInstruction(changes.getInstruction());
        }

        if (changes.getMedicationName() != null) {
            prescriptionOB.setQuantity(changes.getQuantitiy());
        }

        return prescriptionRepository.save(prescriptionOB);
    }
}
