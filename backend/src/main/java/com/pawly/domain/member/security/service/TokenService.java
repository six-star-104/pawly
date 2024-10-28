package com.pawly.domain.member.security.service;

import com.pawly.domain.member.security.dto.response.RefreshTokenResponseDTO;

public interface TokenService {

    void blacklistRefreshToken(String refreshToken);

    RefreshTokenResponseDTO getRefreshToken(String refreshToken) throws Exception;

    boolean isRefreshTokenInBlacklisted(String refreshToken);
}
