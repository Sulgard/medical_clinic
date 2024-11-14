package uwm.backend.medicalclinic.service;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.dto.CreateDoctorRequestDTO;
import uwm.backend.medicalclinic.dto.DoctorResponseDTO;
import uwm.backend.medicalclinic.model.Doctor;
import uwm.backend.medicalclinic.model.Role;
import uwm.backend.medicalclinic.repository.DoctorRepository;
import uwm.backend.medicalclinic.repository.RoleRepository;

import java.util.Optional;

@AllArgsConstructor
@Service
public class DoctorService {
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final DoctorRepository doctorRepository;


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
}
