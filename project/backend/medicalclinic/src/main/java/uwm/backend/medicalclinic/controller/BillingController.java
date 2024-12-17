package uwm.backend.medicalclinic.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uwm.backend.medicalclinic.dto.*;
import uwm.backend.medicalclinic.model.Billing;
import uwm.backend.medicalclinic.service.BillingService;

import java.util.List;

@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api/billing")
@RestController
public class BillingController {

    private final BillingService billingService;

    @GetMapping("upcoming/{id}")
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<List<BillingForListDTO>> pendingCharges(@PathVariable("id") Long patientId) {
        List<BillingForListDTO> response = billingService.pendingPayments(patientId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("pay/{id}")
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<Billing> payForAppointment(@PathVariable("id") Long billingId) {
        Billing response = billingService.payForAppointment(billingId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("details/{id}")
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<BillingDTO> getBillingDetails(@PathVariable("id") Long billingId) {
        BillingDTO response = billingService.getBillingDetails(billingId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("list/patient/{id}")
    @PreAuthorize("hasAnyAuthority('PATIENT', 'ADMIN')")
    public ResponseEntity<BillingListDTO> listFiltereBillings(@PathVariable("id") Long id, @RequestBody BillingFilterDTO filter) {
        return ResponseEntity.ok(billingService.listFilteredBillings(id, filter));
    }
}
