package com.pawly.domain.member.security.entity;

import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@AllArgsConstructor
@RedisHash(value = "tokenBlacklist", timeToLive = 604800) // 7일
public class TokenBlacklist {
    @Id
    private String token;
}
