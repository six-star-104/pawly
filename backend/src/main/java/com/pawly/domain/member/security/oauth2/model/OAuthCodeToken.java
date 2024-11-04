package com.pawly.domain.member.security.oauth2.model;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@Builder
@RedisHash(value = "authCode", timeToLive = 300)
public class OAuthCodeToken {

    @Id
    private String code;
    private String accessToken;
    private String refreshToken;
    private String userEmail;
}