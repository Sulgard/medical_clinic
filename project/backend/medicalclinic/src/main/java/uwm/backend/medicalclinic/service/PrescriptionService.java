package uwm.backend.medicalclinic.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.dto.CreatePrescriptionRequestDTO;
import uwm.backend.medicalclinic.dto.PrescriptionForListDTO;
import uwm.backend.medicalclinic.dto.PrescriptionResponseDTO;
import uwm.backend.medicalclinic.model.Appointment;
import uwm.backend.medicalclinic.model.Medicine;
import uwm.backend.medicalclinic.model.Patient;
import uwm.backend.medicalclinic.model.Prescription;
import uwm.backend.medicalclinic.repository.AppointmentRepository;
import uwm.backend.medicalclinic.repository.MedicineRepository;
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
    private final MedicineRepository medicineRepository;

    public PrescriptionService(AppointmentRepository appointmentRepository,
                               PrescriptionRepository prescriptionRepository,
                               PatientRepository patientRepository,
                               MedicineRepository medicineRepository) {
        this.appointmentRepository = appointmentRepository;
        this.prescriptionRepository = prescriptionRepository;
        this.patientRepository = patientRepository;
        this.medicineRepository = medicineRepository;
    }

    public PrescriptionResponseDTO createPrescritpion(CreatePrescriptionRequestDTO request) {
        Optional<Appointment> appointment = appointmentRepository.findById(request.getAppointmentId());
        Optional<Medicine> medicine = medicineRepository.findById(request.getMedicineId());
        if(!appointment.isPresent())
        {
            throw new EntityNotFoundException("Appointment not found");
        }

        if(!medicine.isPresent())
        {
            throw new EntityNotFoundException("Medicine not found");
        }

        Appointment appointmentOB = appointment.get();
        Medicine medicineOB = medicine.get();
        PrescriptionResponseDTO result = new PrescriptionResponseDTO();
        Prescription prescription = new Prescription();
        prescription.setAppointment(appointmentOB);
        prescription.setMedicine(medicineOB);
        prescription.setInstruction(request.getInstruction());
        prescription.setQuantity(request.getQuantity());
        prescriptionRepository.save((prescription));

        result.setId(prescription.getId());
        result.setAppointmentId(appointmentOB.getId());
        result.setMedicationId(medicineOB.getId());
        result.setMedicationName(medicineOB.getName());
        result.setQuantity(prescription.getQuantity());
        result.setInstruction(prescription.getInstruction());

        return result;
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
        Optional<Medicine> medicine = medicineRepository.findById(changes.getMedicineId());

        if(!prescription.isPresent()) {
            throw new EntityNotFoundException("Prescription not found");
        }

        if(!medicine.isPresent())
        {
            throw new EntityNotFoundException("Medicine not found");
        }

        Prescription prescriptionOB = prescription.get();
        Medicine medicineOB = medicine.get();

        if (changes.getMedicineId() != null) {
            prescriptionOB.setMedicine(medicineOB);
        }

        if (changes.getInstruction() != null) {
            prescriptionOB.setInstruction(changes.getInstruction());
        }

        if (changes.getQuantity() != null) {
            prescriptionOB.setQuantity(changes.getQuantity());
        }

        return prescriptionRepository.save(prescriptionOB);
    }
}
