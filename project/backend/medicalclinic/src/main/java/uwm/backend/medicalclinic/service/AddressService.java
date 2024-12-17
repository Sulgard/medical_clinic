package uwm.backend.medicalclinic.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.dto.AddressResponseDTO;
import uwm.backend.medicalclinic.dto.CreateAddressRequestDTO;
import uwm.backend.medicalclinic.model.Address;
import uwm.backend.medicalclinic.model.Patient;
import uwm.backend.medicalclinic.repository.AddressRepository;
import uwm.backend.medicalclinic.repository.PatientRepository;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final PatientRepository patientRepository;

    //TODO: Add address during patient registration
    public Address createAddress(CreateAddressRequestDTO request) {
        Address address = new Address();
        address.setCity(request.getCity());
        address.setCountry(request.getCountry());
        address.setStreet(request.getStreet());
        address.setProvince(request.getProvince());
        address.setZipCode(request.getZipCode());
        address.setLocalNumber(request.getLocalNumber());

        return addressRepository.saveAndFlush(address);
    }

    public AddressResponseDTO getPatientAddress(Long patientId) {
        Optional<Patient> patient = patientRepository.findPatientById(patientId);

        if(!patient.isPresent()) {
            throw new EntityNotFoundException("Patient not found");
        }

        Patient patientOB =  patient.get();

        Address address = patientOB.getAddress();

        if(address == null) {
            throw new EntityNotFoundException("Address not found");
        }

        AddressResponseDTO result = new AddressResponseDTO();
        result.setCountry(address.getCountry());
        result.setProvince(address.getProvince());
        result.setCity(address.getCity());
        result.setZipCode(address.getZipCode());
        result.setLocalNumber(address.getLocalNumber());
        result.setStreet(address.getStreet());

        return result;

    }
}
