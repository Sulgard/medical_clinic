package uwm.backend.medicalclinic.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.dto.*;
import uwm.backend.medicalclinic.model.Appointment;
import uwm.backend.medicalclinic.model.Billing;
import uwm.backend.medicalclinic.repository.AppointmentRepository;
import uwm.backend.medicalclinic.repository.BillingRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        billing.setPaid(false);
        billing.setAmount(appointmentOB.getAppointmentType().getPrice());

        return billing;
    }

    public Billing payForAppointment(Long billingId) {
        Optional<Billing> billing = billingRepository.findById(billingId);

        if(!billing.isPresent()) {
            throw new EntityNotFoundException("Appointment not found");
        }

        Billing billingOB = billing.get();
        billingOB.setPaid(true);
        billingOB.setPaymentDate(LocalDateTime.now());

        return billingRepository.saveAndFlush(billingOB);
    }

    public List<BillingForListDTO> pendingPayments(Long patientId) {
        List<Billing> billings = billingRepository.findByPatientIdAndPaidFalse(patientId);
        List<BillingForListDTO> result = billings.stream().map(billing -> new BillingForListDTO(billing))
                .collect(Collectors.toList());
        return result;
    }

    public BillingDTO getBillingDetails(Long billingId) {
        Optional<Billing> billing = billingRepository.findById(billingId);

        if(!billing.isPresent()){
            throw new EntityNotFoundException("Billing not found");
        }

        Billing billingOB = billing.get();
        BillingDTO result = new BillingDTO(billingOB);
//        result.setBillingDate(billingOB.getBillingDate());
//        result.setPaymentDate(billingOB.getPaymentDate());
//        result.setId(billingOB.getId());
//        result.setAppointmentId(billingOB.getAppointment().getId());
//        result.setAmount(billingOB.getAmount());
//        result.setPaid(billingOB.isPaid());
        return result;
    }

    public BillingListDTO listFilteredBillings(Long patientId, BillingFilterDTO filter) {
    Pageable pageable = PageRequest.of(
            filter.getPage(),
            filter.getSize(),
            Sort.by(Sort.Direction.fromString(filter.getSortDirection()), filter.getSortField())
    );

    Specification<Billing> specification = (root, query, criteriaBuilder) -> {
        List<Predicate> predicates = new ArrayList<>();

        predicates.add(criteriaBuilder.equal(root.get("patient").get("id"), patientId));
        if (filter.getPaid() != null) {
            predicates.add(criteriaBuilder.equal(root.get("paid"), filter.getPaid()));
        }

        if (filter.getStartDate() != null) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("billingDate"), filter.getStartDate()));
        }
        if (filter.getEndDate() != null) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("billingDate"), filter.getEndDate()));
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    };

    Page<Billing> billingPage = billingRepository.findAll(specification, pageable);
    List<Billing> contents = billingPage.getContent();
    List<BillingDTO> contentDTO = new ArrayList<>();
    for (Billing content : contents ) {
        BillingDTO element = new BillingDTO(content);
        contentDTO.add(element);
    }

    BillingListDTO result = new BillingListDTO();
    result.setContent(contentDTO);
    result.setPageNumber(billingPage.getNumber());
    result.setPageSize(billingPage.getSize());
    result.setTotalPages(billingPage.getTotalPages());
    result.setTotalElements(billingPage.getTotalElements());
    return result;
}
}
