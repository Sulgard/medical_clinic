package uwm.backend.medicalclinic.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uwm.backend.medicalclinic.dto.CreateHealthDetailsRequestDTO;
import uwm.backend.medicalclinic.dto.HealthDetailsResponseDTO;
import uwm.backend.medicalclinic.model.HealthDetails;
import uwm.backend.medicalclinic.service.HealthDetailsService;

@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api/health-details")
@RestController
public class HealthDetailsController {

    private final HealthDetailsService healthDetailsService;

    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('DOCTOR', 'ADMIN')")
    ResponseEntity<?> createHealthDetails(@RequestBody CreateHealthDetailsRequestDTO data) {
        HealthDetails response = healthDetailsService.createHealthDetials(data);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAnyAuthority('DOCTOR', 'ADMIN')")
    ResponseEntity<?> updateHealthDetails(@PathVariable("id") Long id, @RequestBody CreateHealthDetailsRequestDTO data) {
        HealthDetails response = healthDetailsService.modifyHealthDetails(id, data);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/details/{id}")
    @PreAuthorize("hasAnyAuthority('DOCTOR', 'PATIENT', 'ADMIN')")
    ResponseEntity<HealthDetailsResponseDTO> getHealthDetails(@PathVariable("id") Long patientId) {
        HealthDetailsResponseDTO response = healthDetailsService.getHealthDetails(patientId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    void deleteHealthDetails(@PathVariable("id") Long healthDetailsId) {
        healthDetailsService.deleteHealthDetails(healthDetailsId);
    }
}
