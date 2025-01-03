package uwm.backend.medicalclinic.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.dto.*;
import uwm.backend.medicalclinic.model.Doctor;
import uwm.backend.medicalclinic.model.Patient;
import uwm.backend.medicalclinic.model.User;
import uwm.backend.medicalclinic.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService {
    private final PasswordEncoder passwordEncoder;
    UserRepository userRepository;

    public UserInfoDTO getUserInfo(Long id) {
        User user = userRepository.getUserById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if(user instanceof Patient patient) {
            PatientInfoDTO result = new PatientInfoDTO();
            result.setFirstName(patient.getFirstName());
            result.setLastName(patient.getLastName());
            result.setEmail(patient.getEmail());
            result.setInsuranceNumber(patient.getInsuranceNumber());
            result.setBirthDate(patient.getBirthDate());
            result.setPhoneNumber(patient.getPhoneNumber());
            result.setId(patient.getId());
            return result;
        } else if (user instanceof Doctor doctor) {
            DoctorInfoDTO result = new DoctorInfoDTO();
            result.setFirstName(doctor.getFirstName());
            result.setLastName(doctor.getLastName());
            result.setEmail(doctor.getEmail());
            result.setSpecialization(doctor.getSpecialization());
            result.setMedicalLicense(doctor.getMedicalLicense());
            result.setBirthDate(doctor.getBirthDate());
            result.setPhoneNumber(doctor.getPhoneNumber());
            result.setId(doctor.getId());
            return result;
        } else {
            throw new IllegalStateException("Unexpected user role: " + user.getRole());

        }
    }

    @Transactional
    public UpdateConfirmationDTO changePassword(Long id, PasswordChangeRequestDTO request) {
        Optional<User> user = userRepository.findById(id);

        if(!user.isPresent()){
            throw new EntityNotFoundException("User not found");
        }

        User userOB = user.get();
        List<String> changes = new ArrayList<>();

        if (!passwordEncoder.matches(request.getPassword(), userOB.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        if (!isValidPassword(request.getNewPassword())) {
            throw new IllegalArgumentException("New password does not meet security requirements");
        }

        userOB.setPassword(passwordEncoder.encode(request.getNewPassword()));
        changes.add("Password");

        return new UpdateConfirmationDTO("Password changed successfully", changes);
    }


    private boolean isValidPassword(String password) {
        return password.length() >= 8 && password.matches(".*[!@#$%^&*].*");
    }
}
