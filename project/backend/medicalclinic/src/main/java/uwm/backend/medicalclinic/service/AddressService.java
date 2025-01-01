package uwm.backend.medicalclinic.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.hibernate.sql.Update;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.dto.AddressResponseDTO;
import uwm.backend.medicalclinic.dto.CreateAddressRequestDTO;
import uwm.backend.medicalclinic.dto.UpdateConfirmationDTO;
import uwm.backend.medicalclinic.model.Address;
import uwm.backend.medicalclinic.model.Patient;
import uwm.backend.medicalclinic.repository.AddressRepository;
import uwm.backend.medicalclinic.repository.PatientRepository;

import java.util.ArrayList;
import java.util.List;
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

    public UpdateConfirmationDTO editAddress(Long patientId, CreateAddressRequestDTO request) {
        Optional<Patient> patient = patientRepository.findPatientById(patientId);

        if(!patient.isPresent()) {
            throw new EntityNotFoundException("Patient not found");
        }

        Patient patientOB =  patient.get();
        List<String> changes = new ArrayList<>();

        Address existingAddress = addressRepository.findByCountryAndProvinceAndCityAndZipCodeAndStreetAndLocalNumber(
                request.getCountry(),
                request.getProvince(),
                request.getCity(),
                request.getZipCode(),
                request.getStreet(),
                request.getLocalNumber()
        );

        Address currentAddress = patientOB.getAddress();

        if (existingAddress == null) {
            Address newAddress = new Address();
            newAddress.setCity(request.getCity());
            newAddress.setCountry(request.getCountry());
            newAddress.setProvince(request.getProvince());
            newAddress.setZipCode(request.getZipCode());
            newAddress.setStreet(request.getStreet());
            newAddress.setLocalNumber(request.getLocalNumber());

            patientOB.setAddress(newAddress);
            addressRepository.save(newAddress);
            changes.add("New address created");
        } else if (!existingAddress.equals(currentAddress)) {
            patientOB.setAddress(existingAddress);
            changes.add("Address updated");
        } else {
            changes.add("No changes to the address");
        }

        patientRepository.save(patientOB);

        return new UpdateConfirmationDTO(
                "Address change operation completed",
                changes
        );
    }
}
