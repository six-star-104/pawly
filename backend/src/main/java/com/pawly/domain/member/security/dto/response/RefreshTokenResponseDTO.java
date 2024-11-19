package com.pawly.domain.member.security.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RefreshTokenResponseDTO {

    private String accessToken;
    private String refreshToken;
}
