package uwm.backend.medicalclinic.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "billings")
public class Billing extends BaseEntity {
    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "amount")
    private double amount;

    @Column(name = "payment_date")
    private Date paymentDate;

    @Column(name = "billing_date")
    private Date billingDate;

    @OneToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
}
