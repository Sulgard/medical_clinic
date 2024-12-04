package uwm.backend.medicalclinic.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uwm.backend.medicalclinic.dto.AppointmentDTO;
import uwm.backend.medicalclinic.dto.CreateAppointmentRequestDTO;
import uwm.backend.medicalclinic.dto.CreateAppointmentResponseDTO;
import uwm.backend.medicalclinic.dto.DoctorForListResponseDTO;
import uwm.backend.medicalclinic.model.Appointment;
import uwm.backend.medicalclinic.model.AppointmentType;
import uwm.backend.medicalclinic.service.AppointmentService;
import uwm.backend.medicalclinic.service.AppointmentTypeService;

import java.util.List;

@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api/appointment")
@RestController
public class AppointmentController {
    private final AppointmentTypeService appointmentTypeService;
    AppointmentService appointmentService;

    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('PATIENT', 'ADMIN', 'DOCTOR')")
    public CreateAppointmentResponseDTO createAppointment(@RequestBody CreateAppointmentRequestDTO request) {
        return appointmentService.bookAppointment(request);
    }

    @GetMapping("/appointments")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> listAppointments() {
        List<AppointmentDTO> appointments = appointmentService.listAppointments();
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("appointments/{id}")
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<?> getAppointment(@PathVariable Long id) {
        AppointmentDTO appointment = appointmentService.getAppointment(id);
        return ResponseEntity.ok(appointment);
    }

    @GetMapping("appointments/patients/{id}")
    @PreAuthorize("hasAnyAuthority('PATIENT', 'ADMIN')")
    public ResponseEntity<?> listAppointmentsForPatient(@PathVariable Long id) {
        List<AppointmentDTO> appointments = appointmentService.listAppointmentsForPatient(id);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/doctors/{id}")
    @PreAuthorize("hasAnyAuthority('DOCTOR', 'ADMIN')")
    public ResponseEntity<?> listAppointmentsForDoctor(@PathVariable Long id) {
        List<AppointmentDTO> appointments = appointmentService.listAppointmentsForDoctor(id);
        return ResponseEntity.ok(appointments);
    }

    @PostMapping("appointments/{id}/cancel")
    @PreAuthorize("hasAnyAuthority('PATIENT', 'DOCTOR')")
    public ResponseEntity<?> cancelAppointment(
            @PathVariable Long id,
            @RequestParam Long patientId
    ) {
        Appointment response = appointmentService.cancelAppointment(id, patientId);

        return ResponseEntity.ok(response);
    }

    @GetMapping("appointments/available-doctors")
    @PreAuthorize("hasAuthority('PATIENT')")
    ResponseEntity<List<DoctorForListResponseDTO>> getAvailableDoctors(
            @RequestParam(required = false) String date,
            @RequestParam(required = false) String time
    ) {
        List<DoctorForListResponseDTO> availableDoctors = appointmentService.listAvailableDoctors(date, time);
        return ResponseEntity.ok(availableDoctors);
    }

    @DeleteMapping("appointments/{id}/delete")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
    }

    @GetMapping("appointments/type")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> fetchAppointments() {
        List<AppointmentType> response = appointmentTypeService.getAllAppointmentTypes();
        return  ResponseEntity.ok(response);
    }
}
