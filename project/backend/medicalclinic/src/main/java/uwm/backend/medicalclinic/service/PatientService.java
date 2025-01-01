package uwm.backend.medicalclinic.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.dto.*;
import uwm.backend.medicalclinic.model.Doctor;
import uwm.backend.medicalclinic.model.Patient;
import uwm.backend.medicalclinic.repository.PatientRepository;
import uwm.backend.medicalclinic.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

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
        result.setFullName(patient.getFullName());
        result.setId(patient.getId());

        return result;
    }

    public PatientListDTO listFilteredPatients(PatientFilterDTO filter) {
        Pageable pageable = PageRequest.of(
                filter.getPage(),
                filter.getSize(),
                Sort.by(Sort.Direction.fromString(filter.getSortDirection()), filter.getSortField())
        );

        Specification<Patient> specification = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (filter.getName() != null && !filter.getName().isEmpty()) {
                String pattern = "%" + filter.getName().toLowerCase() + "%";
                Predicate firstNamePredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("firstName")), pattern);
                Predicate lastNamePredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("lastName")), pattern);
                predicates.add(criteriaBuilder.or(firstNamePredicate, lastNamePredicate));
            }

            if (filter.getEmail() != null && !filter.getEmail().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("email"), filter.getEmail()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        Page<Patient> patientPage = patientRepository.findAll(specification, pageable);
        List<Patient> contents = patientPage.getContent();
        List<PatientForListDTO> contentDTO = new ArrayList<>();
        for (Patient content : contents ) {
            PatientForListDTO element = new PatientForListDTO(content);
            contentDTO.add(element);
        }

        PatientListDTO result = new PatientListDTO();
        result.setContent(contentDTO);
        result.setPageNumber(patientPage.getNumber());
        result.setPageSize(patientPage.getSize());
        result.setTotalPages(patientPage.getTotalPages());
        result.setTotalElements(patientPage.getTotalElements());
        return result;
    }

    public UpdateConfirmationDTO editContactInfo(EditContactDTO request, Long patientId) {
        Optional<Patient> patient = patientRepository.findById(patientId);

        if(!patient.isPresent()) {
            throw new EntityNotFoundException("Patient not found");
        }

        Patient patientOB = patient.get();
        List<String> updatedFields = new ArrayList<>();

        if(request.getFirstName() != null && !request.getFirstName().isEmpty()) {
            patientOB.setFirstName(request.getFirstName());
            updatedFields.add("firstName");
        }

        if(request.getLastName() != null && !request.getLastName().isEmpty()) {
            patientOB.setLastName(request.getLastName());
            updatedFields.add("lastName");
        }

        if(request.getEmail() != null && !request.getEmail().isEmpty()) {
            patientOB.setEmail(request.getEmail());
            updatedFields.add("email");
        }

        if(request.getPhoneNumber() != null && !request.getPhoneNumber().isEmpty()) {
            patientOB.setPhoneNumber(request.getPhoneNumber());
            updatedFields.add("phoneNumber");
        }

        patientRepository.save(patientOB);

        UpdateConfirmationDTO result = new UpdateConfirmationDTO(
                "Contact information updated successfully", updatedFields
        );

        return result;
    }

    @Transactional
    public UpdateConfirmationDTO deleteDoctor(Long patientId) {
        Optional<Patient> patient = patientRepository.findById(patientId);

        if(!patient.isPresent()) {
            throw new EntityNotFoundException("Doctor not found");
        }

        Patient patientOB = patient.get();

        patientRepository.delete(patientOB);
        userRepository.delete(patientOB);
        List<String> changes = new ArrayList<>();
        UpdateConfirmationDTO result = new UpdateConfirmationDTO(
                "Patient deleted successfully", changes
        );
        return result;
    }
}
