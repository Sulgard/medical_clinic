package uwm.backend.medicalclinic.initializer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import uwm.backend.medicalclinic.model.Role;
import uwm.backend.medicalclinic.repository.RoleRepository;

@Component
public class RoleInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        if(!roleRepository.findByName("PATIENT").isPresent()) {
            Role patientRole = new Role();
            patientRole.setName("PATIENT");

            roleRepository.save(patientRole);

            System.out.println("PATIENT ROLE CREATED");
        } else {
            System.out.println("PATIENT ROLE ALREADY EXISTED");
        }
    }
}
