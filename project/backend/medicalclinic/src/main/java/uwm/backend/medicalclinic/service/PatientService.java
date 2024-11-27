package uwm.backend.medicalclinic.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.dto.PatientInfoDTO;
import uwm.backend.medicalclinic.model.Patient;
import uwm.backend.medicalclinic.repository.PatientRepository;

@AllArgsConstructor
@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientInfoDTO getPatientInfo(Long id) {
        Patient patient = patientRepository.findPatientById(id)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found"));

        PatientInfoDTO result = new PatientInfoDTO();
        result.setFirstName(patient.getFirstName());
        result.setFirstName(patient.getFirstName());
        result.setLastName(patient.getLastName());
        result.setEmail(patient.getEmail());
        result.setInsuranceNumber(patient.getInsuranceNumber());
        result.setBirthDate(patient.getBirthDate());
        result.setPhoneNumber(patient.getPhoneNumber());

        return result;
    }
}
