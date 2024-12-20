package uwm.backend.medicalclinic.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.dto.MedicineDTO;
import uwm.backend.medicalclinic.model.Medicine;
import uwm.backend.medicalclinic.repository.MedicineRepository;

import java.util.ArrayList;
import java.util.List;
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
}
