package uwm.backend.medicalclinic.service;

import org.springframework.stereotype.Service;
import uwm.backend.medicalclinic.model.RefreshToken;
import uwm.backend.medicalclinic.repository.RefreshTokenRepository;
import uwm.backend.medicalclinic.repository.UserRepository;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    public RefreshTokenService(
            RefreshTokenRepository refreshTokenRepository,
            UserRepository userRepository
    ) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }

    public RefreshToken createRefreshToken(String email) {
        RefreshToken refreshToken = RefreshToken.builder()
                .user(userRepository.findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("User with email " + email + " not found")))
                .refreshToken(UUID.randomUUID().toString())
                .expiresAt(Instant.now().plusMillis(60000))
                .build();
        return refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByRefreshToken(token);
    }

    public RefreshToken verifyExpiration(RefreshToken refreshToken) {
        if(refreshToken.getExpiresAt().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(refreshToken);
            throw new RuntimeException(refreshToken.getRefreshToken() + "Refresh token is expired.");
        }
        return refreshToken;
    }
}
