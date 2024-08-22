package uwm.backend.medicalclinic.dto;

import lombok.Builder;

@Builder
public record JwtResponseDTO(
        String accessToken,
        String refreshToken
) {
}
