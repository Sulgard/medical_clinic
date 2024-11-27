package uwm.backend.medicalclinic.controller;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uwm.backend.medicalclinic.dto.CreateDoctorRequestDTO;
import uwm.backend.medicalclinic.dto.DoctorInfoDTO;
import uwm.backend.medicalclinic.dto.DoctorResponseDTO;
import uwm.backend.medicalclinic.service.DoctorService;

@AllArgsConstructor
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
}
