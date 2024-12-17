package uwm.backend.medicalclinic.dto;

import lombok.Data;
import uwm.backend.medicalclinic.model.Billing;

import java.time.LocalDateTime;

@Data
public class BillingForListDTO {
    private Long id;
    private double amount;
    private LocalDateTime paymentDate;
    private LocalDateTime billingDate;
    private Long appointmentId;

    public BillingForListDTO(Billing billing) {
        this.id = billing.getId();
        this.paymentDate = billing.getPaymentDate();
        this.billingDate = billing.getBillingDate();
        this.appointmentId = billing.getAppointment().getId();
        this.amount = billing.getAmount();
    }
}
