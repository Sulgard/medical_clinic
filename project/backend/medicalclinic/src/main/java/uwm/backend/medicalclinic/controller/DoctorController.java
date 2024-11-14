package uwm.backend.medicalclinic.controller;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uwm.backend.medicalclinic.dto.CreateDoctorRequestDTO;
import uwm.backend.medicalclinic.dto.DoctorResponseDTO;
import uwm.backend.medicalclinic.service.DoctorService;

@AllArgsConstructor
@RequestMapping("/doctor")
@RestController
public class DoctorController {
    DoctorService doctorService;

    @PostMapping("/create")
    public DoctorResponseDTO createDoctor(@RequestBody CreateDoctorRequestDTO request) {
        return doctorService.createDoctor(request);
    }
}
