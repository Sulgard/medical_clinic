package uwm.backend.medicalclinic.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uwm.backend.medicalclinic.dto.*;
import uwm.backend.medicalclinic.service.PatientService;


@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api/patients")
@RestController
public class PatientController {

    private final PatientService patientService;

    @GetMapping("/info/{id}")
    @PreAuthorize("hasAnyAuthority('PATIENT', 'DOCTOR', 'ADMIN')")
    ResponseEntity<PatientInfoDTO> getPatientInfo(@PathVariable Long id) {
        PatientInfoDTO response = patientService.getPatientInfo(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/list")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'DOCTOR')")
    public ResponseEntity<PatientListDTO> listFilteredPatients(@RequestBody PatientFilterDTO filter) {
        return ResponseEntity.ok(patientService.listFilteredPatients(filter));
    }

    @PostMapping("/contact/{id}/edit")
    @PreAuthorize("hasAnyAuthority('PATIENT', 'ADMIN')")
    ResponseEntity<UpdateConfirmationDTO> editContactInfo(
            @RequestBody EditContactDTO editContactDTO,
            @PathVariable("id") Long patientId
    ) {
        UpdateConfirmationDTO response = patientService.editContactInfo(editContactDTO, patientId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    ResponseEntity<?> deletePatient(@PathVariable("id") Long patientId) {
        return ResponseEntity.ok(patientService.deleteDoctor(patientId));
    }
}
