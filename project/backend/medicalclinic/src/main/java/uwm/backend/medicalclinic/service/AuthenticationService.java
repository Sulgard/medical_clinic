package uwm.backend.medicalclinic.service;

import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.dto.AuthRequestDTO;
import uwm.backend.medicalclinic.dto.CreatePatientResponseDTO;
import uwm.backend.medicalclinic.dto.RegisterPatientDto;
import uwm.backend.medicalclinic.model.Address;
import uwm.backend.medicalclinic.model.Patient;
import uwm.backend.medicalclinic.model.Role;
import uwm.backend.medicalclinic.repository.AddressRepository;
import uwm.backend.medicalclinic.repository.PatientRepository;
import uwm.backend.medicalclinic.repository.RoleRepository;

@AllArgsConstructor
@Service
public class AuthenticationService {
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;
    private final AddressRepository addressRepository;


    public CreatePatientResponseDTO signup(RegisterPatientDto input) {
        Role patientRole = roleRepository.findByName("PATIENT")
                .orElseThrow(() -> new RuntimeException("Patient Role not found"));
        CreatePatientResponseDTO result = new CreatePatientResponseDTO();

        Address address = addressRepository.findByCountryAndProvinceAndCityAndZipCodeAndStreetAndLocalNumber(
            input.getCountry(),
            input.getProvince(),
            input.getCity(),
            input.getZipCode(),
            input.getStreet(),
            input.getLocalNumber());

        if(address == null) {
            address = new Address();
            address.setCity(input.getCity());
            address.setCountry(input.getCountry());
            address.setProvince(input.getProvince());
            address.setZipCode(input.getZipCode());
            address.setLocalNumber(input.getLocalNumber());
            address.setStreet(input.getStreet());
            addressRepository.save(address);
        }

        Patient patient = new Patient();
        patient.setFirstName(input.getFirstName());
        patient.setLastName(input.getLastName());
        patient.setEmail(input.getEmail());
        patient.setPassword(passwordEncoder.encode(input.getPassword()));
        patient.setRole(patientRole);
        patient.setPhoneNumber(input.getPhoneNumber());
        patient.setInsuranceNumber(input.getInsuranceNumber());
        patient.setGender(input.getGender());
        patient.setBirthDate(input.getBirthDate());
        patient.setAddress(address);
        result.setName(input.getFirstName());
        result.setSecondeName(input.getLastName());
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
