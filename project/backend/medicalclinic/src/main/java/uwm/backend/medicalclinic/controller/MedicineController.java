package uwm.backend.medicalclinic.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import uwm.backend.medicalclinic.dto.CreateMedicineRequestDTO;
import uwm.backend.medicalclinic.dto.MedicineDTO;
import uwm.backend.medicalclinic.dto.MedicineFilterDTO;
import uwm.backend.medicalclinic.dto.MedicineListDTO;
import uwm.backend.medicalclinic.model.Medicine;
import uwm.backend.medicalclinic.service.MedicineService;

import java.util.List;

@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api/medicine")
@RestController
public class MedicineController {

    private final MedicineService medicineService;

    @GetMapping("/list")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'DOCTOR')")
    public ResponseEntity<List<MedicineDTO>> getAllMedicine() {
        List<MedicineDTO> response = medicineService.listMedicine();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/listFiltered")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'DOCTOR')")
    public ResponseEntity<MedicineListDTO> getFilteredMedicine(@RequestBody MedicineFilterDTO filter) {
        return ResponseEntity.ok(medicineService.listFilteredMedicine(filter));
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('DOCTOR')")
    ResponseEntity<Medicine> modifyMedicine(@PathVariable("id") Long id, @RequestBody CreateMedicineRequestDTO data) {
        Medicine response = medicineService.modifyMedicine(id, data);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'DOCTOR')")
    void deleteMedicine(@PathVariable("id") Long id) {
        medicineService.deleteMedicine(id);
    }
}