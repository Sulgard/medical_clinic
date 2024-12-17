package uwm.backend.medicalclinic.controller;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uwm.backend.medicalclinic.dto.*;
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
    private static final Logger log = LoggerFactory.getLogger(AppointmentController.class);
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
    @PreAuthorize("hasAnyAuthority('PATIENT', 'DOCTOR', 'ADMIN')")
    public ResponseEntity<AppointmentDTO> getAppointment(@PathVariable Long id) {
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
            @RequestBody CancelAppointmentDTO cancel
    ) {
        Appointment response = appointmentService.cancelAppointment(id,cancel);

        return ResponseEntity.ok(response);
    }

    @GetMapping("appointments/upcoming/{id}")
    @PreAuthorize("hasAuthority('PATIENT')")
    ResponseEntity<List<AppointmentForListDTO>> upcomingPatientAppointments(@PathVariable("id") Long patientId) {
        List<AppointmentForListDTO> response = appointmentService.upcomingPatientAppointments(patientId);
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
    @PreAuthorize("hasAnyAuthority('PATIENT', 'DOCTOR', 'ADMIN')")
    public ResponseEntity<?> fetchAppointments() {
        List<AppointmentType> response = appointmentTypeService.getAllAppointmentTypes();
        return  ResponseEntity.ok(response);
    }

    @PostMapping("appointments/patient2/{id}")
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<AppointmentListDTO> listFilteredAppointmentsForPatient2(@PathVariable("id") Long id, @RequestBody AppointmentFilterDTO filter) {
        return ResponseEntity.ok(appointmentService.listFilteredAppointmentsForPatientTwo(id, filter));
    }

    @PostMapping("appointments/{id}/manage")
    @PreAuthorize("hasAuthority('DOCTOR')")
    public ResponseEntity<Appointment> manageAppointment(@PathVariable("id") Long id, @RequestBody AppointmentDTO data) {
        Appointment response = appointmentService.manageAppointment(id, data);
        return ResponseEntity.ok(response);
    }
}
