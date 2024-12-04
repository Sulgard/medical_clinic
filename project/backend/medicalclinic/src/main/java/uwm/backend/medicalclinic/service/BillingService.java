package uwm.backend.medicalclinic.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.model.Appointment;
import uwm.backend.medicalclinic.model.Billing;
import uwm.backend.medicalclinic.repository.AppointmentRepository;
import uwm.backend.medicalclinic.repository.BillingRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class BillingService {

    private final AppointmentRepository appointmentRepository;
    private final BillingRepository billingRepository;

    public BillingService(AppointmentRepository appointmentRepository, BillingRepository billingRepository) {
        this.appointmentRepository = appointmentRepository;
        this.billingRepository = billingRepository;
    }

    public Billing createBillingforAppointment(Long appointmentId) {
        Optional<Appointment> appointment = appointmentRepository.findById(appointmentId);

        if(!appointment.isPresent()) {
            throw new EntityNotFoundException("Appointment not found");
        }

        Appointment appointmentOB = appointment.get();


        Billing billing = new Billing();
        billing.setPaymentMethod("NOT SET YET");
        billing.setBillingDate(LocalDateTime.now());
        billing.setAppointment(appointmentOB);
        billing.setPatient(appointmentOB.getPatient());
        billing.setAmount(appointmentOB.getAppointmentType().getPrice());

        return billing;
    }

    public Billing payForAppointment(Long billingId) {
        Optional<Billing> billing = billingRepository.findById(billingId);

        if(!billing.isPresent()) {
            throw new EntityNotFoundException("Appointment not found");
        }

        Billing billingOB = billing.get();
        billingOB.setPaymentDate(LocalDateTime.now());

        return billingRepository.save(billingOB);
    }
}
