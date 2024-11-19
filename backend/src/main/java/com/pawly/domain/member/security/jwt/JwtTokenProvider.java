package com.pawly.domain.member.security.jwt;

import com.pawly.domain.member.security.exception.TokenExpiredException;
import com.pawly.domain.member.security.service.CustomUserDetailsService;
import com.pawly.global.exception.ErrorCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import java.util.Date;
import javax.crypto.SecretKey;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
@Getter
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final CustomUserDetailsService customUserDetailsService;

    @Value("${jwt.access-expiration}")
    private long accessTokenExpiration;

    @Value("${jwt.refresh-expiration}")
    private long refreshTokenExpiration;

    @Value("${jwt.oauth-expiration}")
    private long oauthTokenExpiration;

    @Value("${jwt.access-secret}")
    private String secretKeyString;

    private SecretKey secretKey;

    @PostConstruct
    protected void init() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKeyString);
        this.secretKey = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateAccessToken(String userEmail) {
        return generateToken(userEmail, accessTokenExpiration);
    }

    public String generateRefreshToken(String userEmail) {
        return generateToken(userEmail, refreshTokenExpiration);
    }

    private String generateToken(String userEmail, long expiration) {
        return Jwts.builder()
            .issuer("pawly")
            .subject("JWT Token")
            .claim("userEmail", userEmail)
            .issuedAt(new Date())
            .expiration(new Date(new Date().getTime() + expiration))
            .signWith(secretKey)
            .compact();
    }

    public String generateOAuthSignUpToken(String userEmail, String userName) {
        return Jwts.builder()
            .issuer("pawly")
            .subject("JWT Token")
            .claim("email", userEmail)
            .claim("name", userName)
            .issuedAt(new Date())
            .expiration(new Date(new Date().getTime() + oauthTokenExpiration))
            .signWith(secretKey)
            .compact();
    }

    public String getUserEmail(String token) {
        return getClaims(token).get("userEmail", String.class);
    }

    public Claims getClaims(String token) {
        return Jwts.parser()
            .verifyWith(getSecretKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token);
            return true;
        } catch (ExpiredJwtException e) {
            throw new TokenExpiredException(ErrorCode.ACCESS_TOKEN_EXPIRED);
        } catch (JwtException | IllegalArgumentException exception) {
            return false;
        }
    }

    public Authentication getAuthentication(String token) {
        String userEmail = this.getUserEmail(token);
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(userEmail);
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }
}

