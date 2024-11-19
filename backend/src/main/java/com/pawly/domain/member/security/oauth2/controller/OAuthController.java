package com.pawly.domain.member.security.oauth2.controller;

import com.pawly.domain.member.security.entity.RefreshToken;
import com.pawly.domain.member.security.jwt.JwtTokenProvider;
import com.pawly.domain.member.security.oauth2.dto.response.ResponseOAuthInfoDTO;
import com.pawly.domain.member.security.oauth2.model.OAuthCodeToken;
import com.pawly.domain.member.security.oauth2.model.TempUser;
import com.pawly.domain.member.security.oauth2.repository.OAuthCodeTokenRepository;
import com.pawly.domain.member.security.oauth2.repository.TempUserRepository;
import com.pawly.domain.member.security.repository.RefreshTokenRepository;
import com.pawly.domain.member.service.MemberService;
import com.pawly.domain.member.security.dto.response.LoginResponseDTO;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import jakarta.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/oauth")
@RequiredArgsConstructor
@Slf4j
public class OAuthController {

    private final JwtTokenProvider jwtTokenProvider;
    private final OAuthCodeTokenRepository oAuthCodeTokenRepository;
    private final TempUserRepository tempUserRepository;
    private final MemberService memberService;
    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${oauth2.baseUrl}")
    private String baseUrl;

    @GetMapping("/login/{provider}")
    public ResponseEntity<Map<String, String>> getOAuthLoginUrl(@PathVariable String provider) {
        String redirectUrl = baseUrl + "/oauth2/authorization/" + provider;
        Map<String, String> response = new HashMap<>();
        response.put("url", redirectUrl);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/get-oauth-info")
    public ApiResponse<?> getOAuthInfo(@RequestParam("token") String token) {
        try {
            TempUser tempUser = tempUserRepository.findById(token)
                .orElseThrow(() -> new Exception("토큰이 유효하지 않습니다."));

            String email = tempUser.getEmail();
            String name = tempUser.getName();
            String provider = tempUser.getProvider();
            String providerId = tempUser.getProviderId();

            ResponseOAuthInfoDTO responseDTO = ResponseOAuthInfoDTO
                .builder()
                .email(email)
                .name(name)
                .provider(provider)
                .providerId(providerId)
                .build();

            return ApiResponse.createSuccess(responseDTO, "OAuth 정보 조회 성공");
        } catch (Exception e) {
            return ApiResponse.createError(ErrorCode.TEMP_USER_NOT_FOUND);
        }
    }

    @GetMapping("/get-member-token")
    public ApiResponse<?> getUserToken(@RequestParam("code") String code, HttpServletResponse response) {
        try {
            OAuthCodeToken oAuthCodeToken = oAuthCodeTokenRepository.findById(code)
                .orElseThrow(() -> new Exception("코드가 유효하지 않습니다."));
            String accessToken =oAuthCodeToken.getAccessToken();
            String refreshToken =oAuthCodeToken.getRefreshToken();
            String userEmail = oAuthCodeToken.getUserEmail();

            //refresh토큰 저장
            saveRefreshToken(userEmail, refreshToken);

//            // pawly.o-r.kr 도메인용 쿠키
//            ResponseCookie responseCookieForPawly = ResponseCookie.from("refreshToken", refreshToken)
//                .httpOnly(true)
//                .secure(true) // HTTPS에서만 전송
//                .maxAge(60*60*24*14)
//                .path("/")
//                .sameSite("None")
//                .domain(".pawly.o-r.kr")
//                .build();

            // k11d104.p.ssafy.io 도메인용 쿠키
            ResponseCookie responseCookieForOldDomain = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .maxAge(60*60*24*14)
                .path("/")
                .sameSite("None")
                .domain("k11d104.p.ssafy.io")
                .build();

            // 두 개의 쿠키를 응답 헤더에 추가
//            response.addHeader(HttpHeaders.SET_COOKIE, responseCookieForPawly.toString());
            response.addHeader(HttpHeaders.SET_COOKIE, responseCookieForOldDomain.toString());

            accessToken = "Bearer " + accessToken;
            LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
            loginResponseDTO.setAccessToken(accessToken);

            return ApiResponse.createSuccess(loginResponseDTO, "토큰 발급에 성공하였습니다.");
        } catch (Exception e) {
            return ApiResponse.createError(ErrorCode.OAUTH_CODE_NOT_FOUND);
        }
    }

    private void saveRefreshToken(String userEmail, String refreshToken) {
        long refreshTokenExpireTime = jwtTokenProvider.getRefreshTokenExpiration();
        RefreshToken rt = new RefreshToken(userEmail, refreshToken, refreshTokenExpireTime);
        refreshTokenRepository.save(rt);
    }

}
