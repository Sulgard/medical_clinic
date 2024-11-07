package uwm.backend.medicalclinic.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uwm.backend.medicalclinic.dto.CreateAppointmentRequestDTO;
import uwm.backend.medicalclinic.dto.CreateAppointmentResponseDTO;
import uwm.backend.medicalclinic.service.AppointmentService;

@RequiredArgsConstructor
@RequestMapping("/appointment")
@RestController
public class AppointmentController {
    AppointmentService appointmentService;

    @PostMapping("/create")
    public CreateAppointmentResponseDTO createAppointment(@RequestBody CreateAppointmentRequestDTO request) {
        return appointmentService.createAppointment(request);
    }
}
