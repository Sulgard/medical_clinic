package uwm.backend.medicalclinic.dto;

import lombok.Builder;

@Builder
public record RefreshTokenRequestDTO(
        String refreshToken
) {
}
