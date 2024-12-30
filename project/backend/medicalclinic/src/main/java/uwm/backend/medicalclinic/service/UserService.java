package uwm.backend.medicalclinic.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.dto.DoctorInfoDTO;
import uwm.backend.medicalclinic.dto.PatientInfoDTO;
import uwm.backend.medicalclinic.dto.UserInfoDTO;
import uwm.backend.medicalclinic.model.Doctor;
import uwm.backend.medicalclinic.model.Patient;
import uwm.backend.medicalclinic.model.User;
import uwm.backend.medicalclinic.repository.UserRepository;

@AllArgsConstructor
@Service
public class UserService {
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
}
