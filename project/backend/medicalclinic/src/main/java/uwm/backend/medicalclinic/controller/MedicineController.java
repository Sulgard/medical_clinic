package uwm.backend.medicalclinic.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import uwm.backend.medicalclinic.dto.MedicineDTO;
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
}