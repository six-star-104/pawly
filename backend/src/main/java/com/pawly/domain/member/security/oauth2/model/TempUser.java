package com.pawly.domain.member.security.oauth2.model;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@Builder
@RedisHash(value = "tempUser", timeToLive = 1800)
public class TempUser {
    @Id
    private String token;
    private String email;
    private String name;
    private String provider;
    private String providerId;
}
