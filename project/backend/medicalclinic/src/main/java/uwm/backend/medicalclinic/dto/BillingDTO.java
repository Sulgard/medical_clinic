package uwm.backend.medicalclinic.dto;

import lombok.Data;
import uwm.backend.medicalclinic.model.Billing;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class BillingDTO {
    private Long id;
    private LocalDateTime billingDate;
    private LocalDateTime paymentDate;
    private double amount;
    private Long appointmentId;
    private boolean paid;
    private String appointmentDate;
    private String appointmentTime;

    public BillingDTO(Billing billing) {
        this.id = billing.getId();
        this.billingDate = billing.getBillingDate();
        this.paymentDate = billing.getPaymentDate();
        this.amount = billing.getAmount();
        this.appointmentId = billing.getAppointment().getId();
        this.paid = billing.isPaid();
        this.appointmentDate = billing.getAppointment().getAppointmentDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        this.appointmentTime = billing.getAppointment().getAppointmentTime().format(DateTimeFormatter.ofPattern("HH:mm"));
    }
}
