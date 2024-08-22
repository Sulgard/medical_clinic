package uwm.backend.medicalclinic.dto;

import lombok.Builder;

@Builder
public record AuthRequestDTO(
        String email,
        String password
) {
}
