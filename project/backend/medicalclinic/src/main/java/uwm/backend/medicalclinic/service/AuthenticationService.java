package uwm.backend.medicalclinic.service;

import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.dto.AuthRequestDTO;
import uwm.backend.medicalclinic.dto.CreatePatientResponseDTO;
import uwm.backend.medicalclinic.dto.RegisterPatientDto;
import uwm.backend.medicalclinic.model.Patient;
import uwm.backend.medicalclinic.model.Role;
import uwm.backend.medicalclinic.repository.PatientRepository;
import uwm.backend.medicalclinic.repository.RoleRepository;

@AllArgsConstructor
@Service
public class AuthenticationService {
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;


    public CreatePatientResponseDTO signup(RegisterPatientDto input) {
        Role patientRole = roleRepository.findByName("PATIENT")
                .orElseThrow(() -> new RuntimeException("Patient Role not found"));
        CreatePatientResponseDTO result = new CreatePatientResponseDTO();

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
        result.setName(input.firstName());
        result.setSecondeName(input.lastName());
        result.setCorrect(true);
        patientRepository.saveAndFlush(patient);

        return result;
    }

    public Patient authenticate(AuthRequestDTO input) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                input.email(),
                input.password()
                ));

        return patientRepository.findByEmail(input.email())
                .orElseThrow();
    }

}
