package uwm.backend.medicalclinic.dto;

import lombok.Data;

@Data
public class CreateAddressRequestDTO {
        private String City;
        private String Country;
        private String Street;
        private String Province;
        private String ZipCode;
        private String LocalNumber;
}
