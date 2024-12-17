package uwm.backend.medicalclinic.dto;

import lombok.Data;

@Data
public class AddressResponseDTO {
    private String country;
    private String province;
    private String city;
    private String zipCode;
    private String street;
    private String localNumber;
}
