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
import uwm.backend.medicalclinic.model.Patient;
import uwm.backend.medicalclinic.repository.PatientRepository;

import java.util.ArrayList;
import java.util.List;

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
}
