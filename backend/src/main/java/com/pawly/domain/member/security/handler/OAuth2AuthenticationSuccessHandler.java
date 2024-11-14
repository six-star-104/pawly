package com.pawly.domain.member.security.handler;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.entity.Status;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.domain.member.security.jwt.JwtTokenProvider;
import com.pawly.domain.member.security.oauth2.model.OAuthCodeToken;
import com.pawly.domain.member.security.oauth2.repository.OAuthCodeTokenRepository;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final OAuthCodeTokenRepository oAuthCodeTokenRepository;
    private final MemberRepository memberRepository;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws IOException, ServletException {

        String targetUrl = null;
        String providerType = determineProviderType(request);
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        if (oAuth2User.getAttribute("tempToken") != null) {
            // 임시 토큰이 존재하는 경우 := 새로운 사용자인 경우
            String tempToken = oAuth2User.getAttribute("tempToken");
            targetUrl = UriComponentsBuilder.fromUriString(frontendUrl + "/tmpsignup")
                .queryParam("token", tempToken)
                .build().toUriString();
        } else {
            // 사용자가 이미 존재하는 경우
            String email = extractEmail(oAuth2User, providerType);
            Optional<Member> memberOptional = memberRepository.findByEmail(email);

            if (memberOptional.isPresent()) {
                Member member = memberOptional.get();

                if (member.getStatus() == Status.ACTIVATED) {

                    String tempCode = UUID.randomUUID().toString();
                    String accessToken = jwtTokenProvider.generateAccessToken(member.getEmail());
                    String refreshToken = jwtTokenProvider.generateRefreshToken(member.getEmail());

                    OAuthCodeToken oAuthCodeToken = OAuthCodeToken.builder()
                        .code(tempCode)
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .userEmail(email)
                        .build();
                    oAuthCodeTokenRepository.save(oAuthCodeToken);

                    targetUrl = UriComponentsBuilder.fromUriString(frontendUrl)
                        .queryParam("code", tempCode)
                        .build().toUriString();
                } else {
                    // 사용자가 ACTIVATED 상태가 아닌 경우
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    response.setContentType("application/json;charset=UTF-8");
                    response.getWriter().write("{\"error\": \"ACCESS_DENIED\", \"message\": \"User access denied\"}");
                    return;
                }
            }
        }
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    private String determineProviderType(HttpServletRequest request) {
        String requestUrl = request.getRequestURI();
        if (requestUrl.contains("/login/oauth2/code/")) {
            String[] parts = requestUrl.split("/");
            return parts[parts.length - 1];
        }
        throw new OAuth2AuthenticationException("Provider Type을 찾을 수 없습니다.");
    }

    private String extractEmail(OAuth2User oAuth2User, String providerType) {
        Map<String, Object> attributes = oAuth2User.getAttributes();

        if (providerType.equals("kakao")) {
            Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
            return (String) kakaoAccount.get("email");
        } else if (providerType.equals("google")) {
            return (String) attributes.get("email");
        } else {
            return null;
        }
    }

}