package uwm.backend.medicalclinic.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uwm.backend.medicalclinic.dto.AuthRequestDTO;
import uwm.backend.medicalclinic.dto.JwtResponseDTO;
import uwm.backend.medicalclinic.dto.RefreshTokenRequestDTO;
import uwm.backend.medicalclinic.dto.RegisterPatientDto;
import uwm.backend.medicalclinic.model.Patient;
import uwm.backend.medicalclinic.model.RefreshToken;
import uwm.backend.medicalclinic.service.AuthenticationService;
import uwm.backend.medicalclinic.service.JwtService;
import uwm.backend.medicalclinic.service.RefreshTokenService;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService refreshTokenService;

    public AuthenticationController(
            AuthenticationService authenticationService,
            JwtService jwtService,
            AuthenticationManager authenticationManager, RefreshTokenService refreshTokenService) {
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.refreshTokenService = refreshTokenService;
    }

    @PostMapping("/signup")
    public ResponseEntity<Patient> registerPatient(@RequestBody RegisterPatientDto registerPatientDto) {
        Patient registeredPatient = authenticationService.signup(registerPatientDto);

        return ResponseEntity.ok(registeredPatient);
    }

    @PostMapping("/login")
    public JwtResponseDTO AuthenticateAndGetToken(@RequestBody AuthRequestDTO authRequestDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequestDTO.email(), authRequestDTO.password()));
        if(authentication.isAuthenticated()) {
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(authRequestDTO.email());
            return JwtResponseDTO.builder()
                    .accessToken(jwtService.generateToken(authRequestDTO.email()))
                    .refreshToken(refreshToken.getRefreshToken())
                    .build();
        } else {
            throw new UsernameNotFoundException("Invalid email or password");
        }
    }

    @PostMapping("/refreshToken")
    public JwtResponseDTO refreshToken(@RequestBody RefreshTokenRequestDTO refreshTokenRequestDTO) {
        return refreshTokenService.findByToken(refreshTokenRequestDTO.refreshToken())
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String accessToken = jwtService.generateToken(user.getUsername());
                    return JwtResponseDTO.builder()
                            .accessToken(accessToken)
                            .refreshToken(refreshTokenRequestDTO.refreshToken())
                            .build();
                }).orElseThrow(() -> new RuntimeException("Refresh Token is not in DB"));
    }

}
