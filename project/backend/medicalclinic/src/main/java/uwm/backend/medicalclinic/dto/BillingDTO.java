package uwm.backend.medicalclinic.dto;

import lombok.Data;
import uwm.backend.medicalclinic.model.Billing;

import java.time.LocalDateTime;

@Data
public class BillingDTO {
    private Long id;
    private LocalDateTime billingDate;
    private LocalDateTime paymentDate;
    private double amount;
    private Long appointmentId;
    private boolean paid;

    public BillingDTO(Billing billing) {
        this.id = billing.getId();
        this.billingDate = billing.getBillingDate();
        this.paymentDate = billing.getPaymentDate();
        this.amount = billing.getAmount();
        this.appointmentId = billing.getAppointment().getId();
        this.paid = billing.isPaid();
    }
}
