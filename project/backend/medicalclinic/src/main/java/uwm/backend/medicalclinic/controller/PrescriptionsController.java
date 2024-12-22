package uwm.backend.medicalclinic.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uwm.backend.medicalclinic.dto.CreatePrescriptionRequestDTO;
import uwm.backend.medicalclinic.dto.PrescriptionForListDTO;
import uwm.backend.medicalclinic.dto.PrescriptionResponseDTO;
import uwm.backend.medicalclinic.model.Prescription;
import uwm.backend.medicalclinic.service.PrescriptionService;

import java.util.List;

@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api/prescriptions")
@RestController
public class PrescriptionsController {

    private final PrescriptionService prescriptionService;

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('DOCTOR')")
    ResponseEntity<PrescriptionResponseDTO> createPrescription(@RequestBody CreatePrescriptionRequestDTO data) {
        PrescriptionResponseDTO response = prescriptionService.createPrescritpion(data);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('DOCTOR')")
    ResponseEntity<Prescription> modifyPrescription(@PathVariable("id") Long id, @RequestBody CreatePrescriptionRequestDTO data) {
        Prescription response = prescriptionService.modifyPrescription(id, data);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'DOCTOR')")
    void deletePrescription(@PathVariable("id") Long id) {
        prescriptionService.deletePrescription(id);
    }

    @GetMapping("appointment/list/{id}")
    @PreAuthorize("hasAnyAuthority('DOCTOR', 'PATIENT', 'ADMIN')")    ResponseEntity<List<PrescriptionForListDTO>> listPrescriptionForAppointment(@PathVariable("id") Long id) {
        List<PrescriptionForListDTO> response = prescriptionService.listPrescriptionForAppointment(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("patient/{id}")
    @PreAuthorize("hasAnyAuthority('DOCTOR', 'PATIENT', 'ADMIN')")
    ResponseEntity<List<PrescriptionForListDTO>> listPrescriptionForPatient(@PathVariable("id") Long id) {
        List<PrescriptionForListDTO> response = prescriptionService.listPrescriptionForPatient(id);
        return ResponseEntity.ok(response);
    }




}
