package uwm.backend.medicalclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uwm.backend.medicalclinic.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
    Address findByCountryAndProvinceAndCityAndZipCodeAndLocalNumber(String country, String province,
                                                                    String city, String zipCode, String localNumber);
}
