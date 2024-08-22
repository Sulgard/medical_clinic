package uwm.backend.medicalclinic.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.dto.AuthRequestDTO;
import uwm.backend.medicalclinic.dto.RegisterPatientDto;
import uwm.backend.medicalclinic.enums.RoleEnum;
import uwm.backend.medicalclinic.model.Patient;
import uwm.backend.medicalclinic.model.Role;
import uwm.backend.medicalclinic.repository.RoleRepository;
import uwm.backend.medicalclinic.repository.UserRepository;

import java.util.Optional;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;

    public AuthenticationService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.roleRepository = roleRepository;
    }

    public Patient signup(RegisterPatientDto input) {
        Role patientRole = roleRepository.findByName("PATIENT")
                .orElseThrow(() -> new RuntimeException("Patient Role not found"));

        Patient patient = new Patient();
        patient.setFirstName(input.firstName());
        patient.setLastName(input.lastName());
        patient.setEmail(input.email());
        patient.setPassword(passwordEncoder.encode(input.password()));
        patient.setRole(patientRole);
        patient.setPhoneNumber(input.phoneNumber());
        patient.setInsuranceNumber(input.insuranceNumber());
        patient.setGender(input.gender());
        patient.setBirthDate(input.birthDate());

        return userRepository.save(patient);
    }

    public Patient authenticate(AuthRequestDTO input) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                input.email(),
                input.password()
                ));

        return (Patient) userRepository.findByEmail(input.email())
                .orElseThrow();
    }

}
