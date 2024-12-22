package uwm.backend.medicalclinic.service;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import uwm.backend.medicalclinic.dto.CreateMedicineRequestDTO;
import uwm.backend.medicalclinic.dto.MedicineDTO;
import uwm.backend.medicalclinic.dto.MedicineFilterDTO;
import uwm.backend.medicalclinic.dto.MedicineForListDTO;
import uwm.backend.medicalclinic.dto.MedicineListDTO;
import uwm.backend.medicalclinic.model.Medicine;
import uwm.backend.medicalclinic.repository.MedicineRepository;

import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class MedicineService {

    private final MedicineRepository medicineRepository;

    public List<MedicineDTO> listMedicine() {
        List<Medicine> medicineList = medicineRepository.findAll();

        List<MedicineDTO> medicineDTOList = medicineList.stream().map(MedicineDTO::new)
                .collect(Collectors.toList());

        return medicineDTOList;
    }

    public MedicineListDTO listFilteredMedicine(MedicineFilterDTO filter) {
        Pageable pageable = PageRequest.of(
                filter.getPage(),
                filter.getSize(),
                Sort.by(Sort.Direction.fromString(filter.getSortDirection()), filter.getSortField())
        );
    
        Specification<Medicine> specification = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            if (filter.getName() != null && !filter.getName().isEmpty()) {
                String pattern = "%" + filter.getName().toLowerCase() + "%";
                Predicate namePredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), pattern); 
                predicates.add(namePredicate); 
            }

            if (filter.getCategory() != null && !filter.getCategory().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("category"), filter.getCategory()));
            }
    
            if (filter.getManufacturer() != null && !filter.getManufacturer().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("manufacturer"), filter.getManufacturer()));
            }

            if (filter.getDosageForm() != null && !filter.getDosageForm().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("dosageForm"), filter.getDosageForm()));
            }
    
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    
        Page<Medicine> medicinePage = medicineRepository.findAll(specification, pageable);
        List<Medicine> contents = medicinePage.getContent();
        List<MedicineForListDTO> contentDTO = new ArrayList<>();
        for (Medicine content : contents ) {
            MedicineForListDTO element = new MedicineForListDTO(content);
            contentDTO.add(element);
        }
    
        MedicineListDTO result = new MedicineListDTO();
        result.setContent(contentDTO);
        result.setPageNumber(medicinePage.getNumber());
        result.setPageSize(medicinePage.getSize());
        result.setTotalPages(medicinePage.getTotalPages());
        result.setTotalElements(medicinePage.getTotalElements());
        return result;
    }

    Medicine createMedicine(CreateMedicineRequestDTO request) {
        Medicine result = new Medicine();
        result.setName(request.getName());
        result.setCategory(request.getCategory());
        result.setManufacturer(request.getManufacturer());
        result.setDosageForm(request.getDosageForm());
        return medicineRepository.save(result);
    }

    public void deleteMedicine(Long medicineId) {
        medicineRepository.deleteById(medicineId);
    }

    public Medicine modifyMedicine(Long medicineId, CreateMedicineRequestDTO changes) {
        Optional<Medicine> medicine = medicineRepository.findById(medicineId);

        if(!medicine.isPresent())
        {
            throw new EntityNotFoundException("Medicine not found");
        }

        Medicine medicineOB = medicine.get();

        if (changes.getName() != null) {
            medicineOB.setName(changes.getName());
        }

        if (changes.getCategory() != null) {
            medicineOB.setCategory(changes.getCategory());
        }

        if (changes.getManufacturer() != null) {
            medicineOB.setManufacturer(changes.getManufacturer());
        }

        if (changes.getDosageForm() != null) {
            medicineOB.setDosageForm(changes.getDosageForm());
        }

        return medicineRepository.save(medicineOB);
    }
}
