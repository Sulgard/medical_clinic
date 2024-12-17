package uwm.backend.medicalclinic.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uwm.backend.medicalclinic.dto.AddressResponseDTO;
import uwm.backend.medicalclinic.service.AddressService;

@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api/address")
@RestController
public class AddressController {

    private final AddressService addressService;

    @GetMapping("/patient/{id}")
    @PreAuthorize("hasAnyAuthority('PATIENT', 'ADMIN', 'DOCTOR')")
    ResponseEntity<AddressResponseDTO> getPatientAddress(@PathVariable("id") Long id) {
        AddressResponseDTO response = addressService.getPatientAddress(id);
        return ResponseEntity.ok(response);
    }
}
