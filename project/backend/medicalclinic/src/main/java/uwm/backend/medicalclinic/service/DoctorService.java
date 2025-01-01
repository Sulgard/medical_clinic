package uwm.backend.medicalclinic.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.dto.*;
import uwm.backend.medicalclinic.enums.StatusType;
import uwm.backend.medicalclinic.model.Appointment;
import uwm.backend.medicalclinic.model.Doctor;
import uwm.backend.medicalclinic.model.Role;
import uwm.backend.medicalclinic.repository.AppointmentRepository;
import uwm.backend.medicalclinic.repository.DoctorRepository;
import uwm.backend.medicalclinic.repository.RoleRepository;
import uwm.backend.medicalclinic.repository.UserRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class DoctorService {
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;


    public DoctorResponseDTO createDoctor(CreateDoctorRequestDTO input) {
        DoctorResponseDTO result = new DoctorResponseDTO();

        Optional<Role> doctorRole = roleRepository.findByName("DOCTOR");

        if(!doctorRole.isPresent()) {
            result.setCorrect(false);
            return result;
        }
        Role roleOB = doctorRole.get();


        Doctor doctor = new Doctor();
        doctor.setFirstName(input.getFirstName());
        doctor.setLastName(input.getLastName());
        doctor.setEmail(input.getEmail());
        doctor.setPassword(passwordEncoder.encode(input.getPassword()));
        doctor.setRole(roleOB);
        doctor.setPhoneNumber(input.getPhoneNumber());
        doctor.setMedicalLicense(input.getMedicalLicense());
        doctor.setSpecialization(input.getSpecialization());
        doctor.setGender(input.getGender());
        doctor.setBirthDate(input.getBirthDate());
        doctorRepository.saveAndFlush(doctor);
        result.setCorrect(true);
        result.setName(input.getFirstName());
        return result;
    }

    public DoctorInfoDTO getDoctorInfo(Long id) {
        Doctor doctor = doctorRepository.findDoctorById(id)
                .orElseThrow(() -> new EntityNotFoundException("Doctor not found."));

        DoctorInfoDTO result = new DoctorInfoDTO();
        result.setFullName(doctor.getFullName());
        result.setEmail(doctor.getEmail());
        result.setSpecialization(doctor.getSpecialization());
        result.setMedicalLicense(doctor.getMedicalLicense());
        result.setBirthDate(doctor.getBirthDate());
        result.setPhoneNumber(doctor.getPhoneNumber());
        result.setFullName(doctor.getFullName());
        return result;
    }

    public DoctorListDTO listFilteredDoctors(DoctorFilterDTO filter) {
    Pageable pageable = PageRequest.of(
            filter.getPage(),
            filter.getSize(),
            Sort.by(Sort.Direction.fromString(filter.getSortDirection()), filter.getSortField())
    );

    Specification<Doctor> specification = (root, query, criteriaBuilder) -> {
        List<Predicate> predicates = new ArrayList<>();

        if (filter.getName() != null && !filter.getName().isEmpty()) {
            String pattern = "%" + filter.getName().toLowerCase() + "%";
            Predicate firstNamePredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("firstName")), pattern);
            Predicate lastNamePredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("lastName")), pattern);
            predicates.add(criteriaBuilder.or(firstNamePredicate, lastNamePredicate));
        }

        if (filter.getSpecialization() != null && !filter.getSpecialization().isEmpty()) {
            predicates.add(criteriaBuilder.equal(root.get("specialization"), filter.getSpecialization()));
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    };

    Page<Doctor> doctorsPage = doctorRepository.findAll(specification, pageable);
    List<Doctor> contents = doctorsPage.getContent();
    List<DoctorForListDTO> contentDTO = new ArrayList<>();
    for (Doctor content : contents ) {
        DoctorForListDTO element = new DoctorForListDTO(content);
        contentDTO.add(element);
    }

    DoctorListDTO result = new DoctorListDTO();
    result.setContent(contentDTO);
    result.setPageNumber(doctorsPage.getNumber());
    result.setPageSize(doctorsPage.getSize());
    result.setTotalPages(doctorsPage.getTotalPages());
    result.setTotalElements(doctorsPage.getTotalElements());
    return result;
    }

    public UpdateConfirmationDTO editContactInfo(EditContactDTO request, Long doctorId) {
        Optional<Doctor> doctor = doctorRepository.findById(doctorId);

        if(!doctor.isPresent()) {
            throw new EntityNotFoundException("Doctor not found");
        }

        Doctor doctorOB = doctor.get();
        List<String> updatedFields = new ArrayList<>();

        if(request.getEmail() != null && !request.getEmail().isEmpty()) {
            doctorOB.setEmail(request.getEmail());
            updatedFields.add("email");
        }

        if(request.getPhoneNumber() != null && !request.getPhoneNumber().isEmpty()) {
            doctorOB.setPhoneNumber(request.getPhoneNumber());
            updatedFields.add("phoneNumber");
        }

        doctorRepository.save(doctorOB);

        UpdateConfirmationDTO result = new UpdateConfirmationDTO(
                "Contact information updated successfully", updatedFields
        );

        return result;
    }

    public boolean checkDoctorAvailability(Long doctorId, String dataStr, String timeStr) {
        LocalDate date = LocalDate.parse(dataStr);
        LocalTime time = LocalTime.parse(timeStr);
        List<Appointment> appointments = appointmentRepository.findByDoctorIdAndAppointmentDate(doctorId, date);

        for (Appointment appointment : appointments) {
            if (appointment.getAppointmentTime().equals(time)) {
                if (appointment.getStatus().equals(StatusType.CANCELLED)) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        return true;
    }

    public UpdateConfirmationDTO editDoctorInfo(Long doctorId, DoctorInfoDTO request) {
        Optional<Doctor> doctor = doctorRepository.findById(doctorId);

        if(!doctor.isPresent()) {
            throw new EntityNotFoundException("Doctor not found");
        }

        Doctor doctorOB = doctor.get();
        List<String> updatedFields = new ArrayList<>();

        if(request.getFirstName() != null && !request.getFirstName().isEmpty()) {
            doctorOB.setFirstName(request.getFirstName());
            updatedFields.add("firstName");
        }

        if(request.getLastName() != null && !request.getLastName().isEmpty()) {
            doctorOB.setLastName(request.getLastName());
            updatedFields.add("lastName");
        }

        if(request.getEmail() != null && !request.getEmail().isEmpty()) {
            doctorOB.setEmail(request.getEmail());
            updatedFields.add("email");
        }

        if(request.getPhoneNumber() != null && !request.getPhoneNumber().isEmpty()) {
            doctorOB.setPhoneNumber(request.getPhoneNumber());
            updatedFields.add("phoneNumber");
        }

        if(request.getMedicalLicense() != null && !request.getMedicalLicense().isEmpty()) {
            doctorOB.setMedicalLicense(request.getMedicalLicense());
            updatedFields.add("medicalLicense");
        }

        if(request.getSpecialization() != null && !request.getSpecialization().isEmpty()) {
            doctorOB.setSpecialization(request.getSpecialization());
            updatedFields.add("specialization");
        }

        if(request.getPassword() != null && !request.getPassword().isEmpty()) {
            doctorOB.setPassword(passwordEncoder.encode(request.getPassword()));
            updatedFields.add("password");
        }

        doctorRepository.save(doctorOB);
        UpdateConfirmationDTO result = new UpdateConfirmationDTO(
                "Doctor information updated successfully", updatedFields
        );

        return result;
    }

    @Transactional
    public UpdateConfirmationDTO deleteDoctor(Long doctorId) {
        Optional<Doctor> doctor = doctorRepository.findById(doctorId);

        if(!doctor.isPresent()) {
            throw new EntityNotFoundException("Doctor not found");
        }

        Doctor doctorOB = doctor.get();

        doctorRepository.delete(doctorOB);
        userRepository.delete(doctorOB);
        List<String> changes = new ArrayList<>();
        UpdateConfirmationDTO result = new UpdateConfirmationDTO(
                "Doctor deleted successfully", changes
        );
        return result;
    }
}
