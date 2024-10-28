package com.pawly.domain.member.controller;

import com.pawly.domain.member.dto.request.SignUpRequestDTO;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.security.dto.response.LoginResponseDTO;
import com.pawly.domain.member.security.dto.response.RefreshTokenResponseDTO;
import com.pawly.domain.member.security.jwt.JwtTokenProvider;
import com.pawly.domain.member.security.service.TokenService;
import com.pawly.domain.member.service.MemberService;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;
    private final TokenService tokenService;
    private final JwtTokenProvider jwtTokenProvider;

    //회원가입
    @PostMapping("/sign-up")
    public ApiResponse<?> signUp(@RequestBody SignUpRequestDTO signUpRequestDTO) {
        try {
            memberService.signUp(signUpRequestDTO);

            return ApiResponse.createSuccess(null, "회원가입 성공");
        } catch (Exception e) {
            return ApiResponse.createError(ErrorCode.USER_REGISTER_FAILED);
        }
    }

    //로그아웃
    @PostMapping("/logout")
    public ApiResponse<?> logout(HttpServletRequest request, HttpServletResponse response) {
        try {
            String refreshToken = extractRefreshToken(request);
            System.out.println(refreshToken);
            if (refreshToken != null && jwtTokenProvider.validateToken(refreshToken)) {
                tokenService.blacklistRefreshToken(refreshToken);
                Cookie cookie = new Cookie("refreshToken", null);
                cookie.setMaxAge(0);
                cookie.setPath("/"); // 생성 시와 동일한 경로 설정
//                cookie.setDomain("j11d105.p.ssafy.io"); // 생성 시와 동일한 도메인 설정
                response.addCookie(cookie);

            }

            return ApiResponse.createSuccess(null, "로그아웃 성공");
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.createError(ErrorCode.INVALID_JWT_TOKEN);
        }
    }

    private String extractRefreshToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if(cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refreshToken")) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    @PostMapping("/refresh-token")
    public ApiResponse<?> refreshToken(@CookieValue(name = "refreshToken", required = false) String refreshToken,
        HttpServletResponse response) throws Exception {
        try {
            System.out.println(refreshToken);
            if(refreshToken == null || refreshToken.isEmpty()) {
                return ApiResponse.createError(ErrorCode.REFRESH_TOKEN_NOT_FOUND);
            }

            RefreshTokenResponseDTO responseDTO = tokenService.getRefreshToken(refreshToken);

            if(responseDTO == null) {
                return ApiResponse.createError(ErrorCode.REFRESH_TOKEN_NOT_FOUND);
            }
            String newAccessToken = responseDTO.getAccessToken();;
            String newRefreshToken = responseDTO.getRefreshToken();

            ResponseCookie responseCookie = ResponseCookie.from("refreshToken", newRefreshToken)
                .httpOnly(true)
                .secure(true)
                .maxAge(60*60*24*14)
                .path("/")
                .sameSite("None")
//                .domain("j11d105.p.ssafy.io")
                .build();

            response.setHeader(HttpHeaders.SET_COOKIE, responseCookie.toString());

            newAccessToken = "Bearer " + newAccessToken;
            LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
            loginResponseDTO.setAccessToken(newAccessToken);

            return ApiResponse.createSuccess(loginResponseDTO, "토큰 재발급에 성공하였습니다.");
        }
        catch (Exception e) {
            return ApiResponse.createError(ErrorCode.INVALID_JWT_TOKEN);
        }
    }

//    @GetMapping("/profile")
//    public ApiResponse<?> getProfile(Authentication authentication) {
//        try {
//            Member member = memberService.findByEmail(authentication.getName());
//            System.out.println(member);
//            if(member == null) {
//                return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
//            }
//
//            UserProfileResponseDTO dto = memberService.getProfile(member.getUserId());
//            return ApiResponse.createSuccess(dto, "조회 성공 ");
//
//        } catch (Exception e) {
//            return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
//        }
//    }

//    @GetMapping("/check/{nickname}")
//    public ApiResponse<?> getNickname( @PathVariable(value = "nickname") String nickname) {
//        try {
//            boolean isDuplicate = memberService.checkNickname(nickname);
//
//            return ApiResponse.createSuccess(isDuplicate, "성공적으로 닉네임 중복 조회 성공");
//        } catch (Exception e) {
//            return ApiResponse.createError(ErrorCode.NICKNAME_NOT_FOUND);
//        }
//    }

//    @PutMapping("/update-nickname")
//    public ApiResponse<?> updateNickname(Authentication authentication, @RequestBody UpdateNicknameRequestDto updateNicknameRequestDto) {
//        try {
//            Member member = memberService.findByEmail(authentication.getName());
//            if (member == null) {
//                return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
//            }
//            String nickname = updateNicknameRequestDto.getNickname();
//
//            if(memberService.checkNickname(nickname)) {
//                return ApiResponse.createError(ErrorCode.NICKNAME_ALREADY_USED);
//            }
//            memberService.updateNickname(member, nickname);
//            return ApiResponse.createSuccess(null, "닉네임 업데이트 성공");
//
//        } catch (Exception e) {
//            return ApiResponse.createError(ErrorCode.USER_UPDATE_FAILED);
//        }
//    }

    @DeleteMapping("/delete")
    public ApiResponse<?> deleteUser(Authentication authentication, HttpServletRequest request, HttpServletResponse response) {
        try {
            Member member = memberService.findByEmail(authentication.getName());
            if (member == null) {
                return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
            }
            String refreshToken = extractRefreshToken(request);
            if (refreshToken != null && jwtTokenProvider.validateToken(refreshToken)) {

                tokenService.blacklistRefreshToken(refreshToken);

                Cookie cookie = new Cookie("refreshToken", null);
                cookie.setMaxAge(0);
                cookie.setPath("/"); // 생성 시와 동일한 경로 설정
//                cookie.setDomain("j11d105.p.ssafy.io"); // 생성 시와 동일한 도메인 설정
                response.addCookie(cookie);
            } else {
                return ApiResponse.createError(ErrorCode.INVALID_JWT_TOKEN);
            }

            memberService.deleteUser(member.getMemberId());

            return ApiResponse.createSuccess(null, "회원 탈퇴가 완료되었습니다.");
        } catch (Exception e) {
            return ApiResponse.createError(ErrorCode.USER_DELETE_FAILED);
        }
    }
}