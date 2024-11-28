package uwm.backend.medicalclinic.controller;

import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uwm.backend.medicalclinic.dto.AppointmentDTO;
import uwm.backend.medicalclinic.dto.CreateAppointmentRequestDTO;
import uwm.backend.medicalclinic.dto.CreateAppointmentResponseDTO;
import uwm.backend.medicalclinic.model.Appointment;
import uwm.backend.medicalclinic.service.AppointmentService;

import java.util.List;

@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api/appointment")
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

    @GetMapping("/doctors/{id}")
    public ResponseEntity<?> listAppointmentsForDoctor(@PathVariable Long id) {
        List<AppointmentDTO> appointments = appointmentService.listAppointmentsForDoctor(id);
        return ResponseEntity.ok(appointments);
    }

    @PostMapping("appointments/{id}/cancel")
    public ResponseEntity<?> cancelAppointment(
            @PathVariable Long id,
            @RequestParam Long patientId
    ) {
        Appointment response = appointmentService.cancelAppointment(id, patientId);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("appointments/{id}/delete")
    public void deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
    }
}
