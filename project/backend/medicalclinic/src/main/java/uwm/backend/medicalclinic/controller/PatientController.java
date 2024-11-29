package uwm.backend.medicalclinic.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uwm.backend.medicalclinic.dto.PatientInfoDTO;
import uwm.backend.medicalclinic.service.PatientService;


@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api/patients")
@RestController
public class PatientController {

    private final PatientService patientService;

    @GetMapping("/info/{id}")
    @PreAuthorize("hasAuthority('PATIENT')")
    ResponseEntity<PatientInfoDTO> getPatientInfo(@PathVariable Long id) {
        PatientInfoDTO response = patientService.getPatientInfo(id);
        return ResponseEntity.ok(response);
    }
}
