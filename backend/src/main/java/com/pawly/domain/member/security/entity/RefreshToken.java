package com.pawly.domain.member.security.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Builder
@Getter
@AllArgsConstructor
@RedisHash(value = "refreshToken", timeToLive = 1209600)
@NoArgsConstructor
public class RefreshToken {

    @Id
    private String userEmail;
    private String token;
    private long expiration;
}
