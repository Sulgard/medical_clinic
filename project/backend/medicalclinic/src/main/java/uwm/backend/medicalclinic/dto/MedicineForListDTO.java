package uwm.backend.medicalclinic.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;
import uwm.backend.medicalclinic.model.Appointment;
import uwm.backend.medicalclinic.model.Medicine;

@Data
public class MedicineForListDTO {
    private Long id;
    private String name;
    private String category;
    private String dosageForm;
    private String manufacturer;

    public MedicineForListDTO(Medicine medicine) {
        this.id = medicine.getId();
        this.name = medicine.getName();
        this.category = medicine.getCategory();
        this.manufacturer = medicine.getManufacturer();
        this.dosageForm = medicine.getDosageForm();
    }
    
}
