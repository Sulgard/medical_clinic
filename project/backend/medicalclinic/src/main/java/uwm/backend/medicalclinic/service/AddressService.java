package uwm.backend.medicalclinic.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.dto.CreateAddressRequestDTO;
import uwm.backend.medicalclinic.model.Address;
import uwm.backend.medicalclinic.repository.AddressRepository;

@Service
@AllArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;

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


}
