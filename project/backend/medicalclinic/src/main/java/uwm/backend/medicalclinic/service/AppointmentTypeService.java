package uwm.backend.medicalclinic.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.model.AppointmentType;
import uwm.backend.medicalclinic.repository.AppointmentTypeRepository;

import java.util.List;

@AllArgsConstructor
@Service
public class AppointmentTypeService {

    private final AppointmentTypeRepository appointmentTypeRepository;

    public List<AppointmentType> getAllAppointmentTypes() {
        return appointmentTypeRepository.findAll();
    }
}
