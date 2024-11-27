package uwm.backend.medicalclinic.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uwm.backend.medicalclinic.dto.PatientInfoDTO;
import uwm.backend.medicalclinic.service.PatientService;

@AllArgsConstructor
@RequestMapping("api/patients")
@RestController
public class PatientController {

    private final PatientService patientService;

    @GetMapping("/info/{id}")
    ResponseEntity<PatientInfoDTO> getPatientInfo(@PathVariable Long id) {
        PatientInfoDTO response = patientService.getPatientInfo(id);
        return ResponseEntity.ok(response);
    }
}
