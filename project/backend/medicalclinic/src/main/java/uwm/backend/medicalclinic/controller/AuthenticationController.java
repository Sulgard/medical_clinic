package uwm.backend.medicalclinic.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uwm.backend.medicalclinic.auth.LoginResponse;
import uwm.backend.medicalclinic.dto.LoginUserDto;
import uwm.backend.medicalclinic.dto.RegisterPatientDto;
import uwm.backend.medicalclinic.model.Patient;
import uwm.backend.medicalclinic.service.AuthenticationService;
import uwm.backend.medicalclinic.service.JwtService;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final JwtService jwtService;

    public AuthenticationController(
            AuthenticationService authenticationService,
            JwtService jwtService
    ) {
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
    }

    @PostMapping("/signup")
    public ResponseEntity<Patient> registerPatient(@RequestBody RegisterPatientDto registerPatientDto) {
        Patient registeredPatient = authenticationService.signup(registerPatientDto);

        return ResponseEntity.ok(registeredPatient);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        Patient authenticatedPatient = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedPatient);

        LoginResponse response = new LoginResponse();
        response.setToken(jwtToken);

        return ResponseEntity.ok(response);
    }

}
