package uwm.backend.medicalclinic.controller;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uwm.backend.medicalclinic.dto.AppointmentDTO;
import uwm.backend.medicalclinic.dto.CreateAppointmentRequestDTO;
import uwm.backend.medicalclinic.dto.CreateAppointmentResponseDTO;
import uwm.backend.medicalclinic.service.AppointmentService;

import javax.net.ssl.SSLEngineResult;
import java.util.List;

@AllArgsConstructor
@RequestMapping("/appointment")
@RestController
public class AppointmentController {
    AppointmentService appointmentService;

    @PostMapping("/create")
    public CreateAppointmentResponseDTO createAppointment(@RequestBody CreateAppointmentRequestDTO request) {
        return appointmentService.createAppointment(request);
    }

    @GetMapping("/appointments")
    public ResponseEntity<?> listAppointments() {
        List<AppointmentDTO> appointments = appointmentService.listAppointments();
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("appointments/{id}")
    public ResponseEntity<?> getAppointment(@PathVariable Long id) {
        AppointmentDTO appointment = appointmentService.getAppointment(id);
        return ResponseEntity.ok(appointment);
    }

    @GetMapping("appointments/patients/{id}")
    public ResponseEntity<?> listAppointmentsForPatient(@PathVariable Long id) {
        List<AppointmentDTO> appointments = appointmentService.listAppointmentsForPatient(id);
        return ResponseEntity.ok(appointments);
    }
}
