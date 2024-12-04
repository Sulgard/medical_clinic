package uwm.backend.medicalclinic.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.dto.CreateHealthDetailsRequestDTO;
import uwm.backend.medicalclinic.dto.HealthDetailsResponseDTO;
import uwm.backend.medicalclinic.model.HealthDetails;
import uwm.backend.medicalclinic.model.Patient;
import uwm.backend.medicalclinic.repository.HealthDetailsRepository;
import uwm.backend.medicalclinic.repository.PatientRepository;

import java.util.Optional;

@Service
public class HealthDetailsService {

    private final PatientRepository patientRepository;
    private final HealthDetailsRepository healthDetailsRepository;

    public HealthDetailsService(PatientRepository patientRepository, HealthDetailsRepository healthDetailsRepository) {
        this.patientRepository = patientRepository;
        this.healthDetailsRepository = healthDetailsRepository;
    }

    public HealthDetails createHealthDetials(CreateHealthDetailsRequestDTO request) {
        HealthDetails healthDetails = new HealthDetails();

        Optional<Patient> patient = patientRepository.findPatientById(request.getPatientId());

        if (!patient.isPresent()) {
            throw new EntityNotFoundException("Patient not found");
        }

        Patient patientOB = patient.get();

        healthDetails.setPatient(patientOB);

        if (!request.getAllergies().isEmpty()) {
            healthDetails.setAllergies(request.getAllergies());
        }

        if (request.getBloodType() != 0) {
            healthDetails.setBloodType(request.getBloodType());
        }

        if (!request.getChronicConditions().isEmpty()) {
            healthDetails.setChronicConditions(request.getChronicConditions());
        }

        if (!request.getMedications().isEmpty()) {
            healthDetails.setMedications(request.getMedications());
        }

        if (!request.getNotes().isEmpty()) {
            healthDetails.setNotes(request.getNotes());
        }

        if (!request.getEmergencyContactName().isEmpty()) {
            healthDetails.setEmergencyContactName(request.getEmergencyContactName());
        }

        if (!request.getEmergencyContactPhone().isEmpty()) {
            healthDetails.setEmergencyContactPhone(request.getEmergencyContactPhone());
        }

        return healthDetailsRepository.save(healthDetails);
    }

    public HealthDetails modifyHealthDetails(Long healthDetailsId, CreateHealthDetailsRequestDTO request) {
        Optional<HealthDetails> healthDetails = healthDetailsRepository.findById(healthDetailsId);

        if (!healthDetails.isPresent()) {
            throw new EntityNotFoundException("HealthDetails not found");
        }

        HealthDetails healthDetailsOB = healthDetails.get();

        if (!request.getAllergies().isEmpty()) {
            healthDetailsOB.setAllergies(request.getAllergies());
        }

        if (request.getBloodType() != 0) {
            healthDetailsOB.setBloodType(request.getBloodType());
        }

        if (!request.getChronicConditions().isEmpty()) {
            healthDetailsOB.setChronicConditions(request.getChronicConditions());
        }

        if (!request.getMedications().isEmpty()) {
            healthDetailsOB.setMedications(request.getMedications());
        }

        if (!request.getNotes().isEmpty()) {
            healthDetailsOB.setNotes(request.getNotes());
        }

        if (!request.getEmergencyContactName().isEmpty()) {
            healthDetailsOB.setEmergencyContactName(request.getEmergencyContactName());
        }

        if (!request.getEmergencyContactPhone().isEmpty()) {
            healthDetailsOB.setEmergencyContactPhone(request.getEmergencyContactPhone());
        }

        return healthDetailsRepository.save(healthDetailsOB);
    }

    public HealthDetailsResponseDTO getHealthDetails(Long id) {
        HealthDetailsResponseDTO result = new HealthDetailsResponseDTO();

        Optional<HealthDetails> healthDetails = healthDetailsRepository.findById(id);

        if (!healthDetails.isPresent()) {
            throw new EntityNotFoundException("Health Details not foud");
        }

        HealthDetails healthDetailsOB = healthDetails.get();

        result.setId(healthDetailsOB.getId());
        result.setBloodType(healthDetailsOB.getBloodType());
        result.setAllergies(healthDetailsOB.getAllergies());
        result.setChronicConditions(healthDetailsOB.getChronicConditions());
        result.setMedications(healthDetailsOB.getMedications());
        result.setNotes(healthDetailsOB.getNotes());
        result.setEmergencyContactName(healthDetailsOB.getEmergencyContactName());
        result.setEmergencyContactPhone(healthDetailsOB.getEmergencyContactPhone());

        return result;
    }

    public void deleteHealthDetails(Long healthDetailsId) {
        healthDetailsRepository.deleteById(healthDetailsId);
    }
}
