package uwm.backend.medicalclinic.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uwm.backend.medicalclinic.dto.*;
import uwm.backend.medicalclinic.service.DoctorService;

@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api/doctors")
@RestController
public class DoctorController {
    DoctorService doctorService;

    @PostMapping("/create")
    public DoctorResponseDTO createDoctor(@RequestBody CreateDoctorRequestDTO request) {
        return doctorService.createDoctor(request);
    }

    @GetMapping("info/{id}")
    public ResponseEntity<DoctorInfoDTO> getDoctorInfo(@PathVariable Long id) {
        DoctorInfoDTO response = doctorService.getDoctorInfo(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/list")
    @PreAuthorize("hasAnyAuthority('PATIENT', 'ADMIN', 'DOCTOR')")
    public ResponseEntity<DoctorListDTO> listFilteredDoctors(@RequestBody DoctorFilterDTO filter) {
        return ResponseEntity.ok(doctorService.listFilteredDoctors(filter));
    }


}
