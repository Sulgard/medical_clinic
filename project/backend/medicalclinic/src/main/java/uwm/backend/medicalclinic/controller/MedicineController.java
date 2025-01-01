package uwm.backend.medicalclinic.controller;

import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import uwm.backend.medicalclinic.dto.*;
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

    @GetMapping("/info/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'DOCTOR', 'PATIENT')")
    public ResponseEntity<MedicineForListDTO> getMedicineInfo(@PathVariable Long id) {
        return ResponseEntity.ok(medicineService.getMedicineInfo(id));
    }

    @PostMapping("/listFiltered")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'DOCTOR')")
    public ResponseEntity<MedicineListDTO> getFilteredMedicine(@RequestBody MedicineFilterDTO filter) {
        return ResponseEntity.ok(medicineService.listFilteredMedicine(filter));
    }

    @PostMapping("/update/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    ResponseEntity<UpdateConfirmationDTO> modifyMedicine(@PathVariable("id") Long id, @RequestBody CreateMedicineRequestDTO data) {
        return ResponseEntity.ok(medicineService.modifyMedicine(id, data));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<UpdateConfirmationDTO> deleteMedicine(@PathVariable("id") Long id) {
        return ResponseEntity.ok(medicineService.deleteMedicine(id));
    }

    @PostMapping("/add")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Medicine> addMedicine(@RequestBody CreateMedicineRequestDTO data) {
        return ResponseEntity.ok(medicineService.createMedicine(data));
    }
}