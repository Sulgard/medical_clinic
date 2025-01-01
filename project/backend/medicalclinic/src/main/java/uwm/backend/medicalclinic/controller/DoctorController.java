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

    @PostMapping("/contact/{id}/edit")
    @PreAuthorize("hasAuthority('DOCTOR')")
    ResponseEntity<UpdateConfirmationDTO> editContactInfo(
            @RequestBody EditContactDTO editContactDTO,
            @PathVariable("id") Long doctorId
    ) {
        UpdateConfirmationDTO response = doctorService.editContactInfo(editContactDTO, doctorId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("isAvailable/{id}")
    @PreAuthorize("hasAuthority('DOCTOR')")
    ResponseEntity<Boolean> checkDoctorAvailability(@PathVariable("id") Long doctorId,
                                                    @RequestParam(required = false) String date,
                                                    @RequestParam(required = false) String time) {
        System.out.println("Test");
        return ResponseEntity.ok(doctorService.checkDoctorAvailability(doctorId, date, time));
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    ResponseEntity<?> deleteDoctor(@PathVariable("id") Long doctorId) {
        return ResponseEntity.ok(doctorService.deleteDoctor(doctorId));
    }

    @PostMapping("edit/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    ResponseEntity<UpdateConfirmationDTO> editDoctor(@PathVariable("id") Long doctorId,
                                                     @RequestBody DoctorInfoDTO editDoctorInfoDTO){
        return ResponseEntity.ok(doctorService.editDoctorInfo(doctorId, editDoctorInfoDTO));
    }
}
