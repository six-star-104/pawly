package com.pawly.domain.member.controller;

import com.pawly.domain.member.dto.request.SignUpRequestDTO;
import com.pawly.domain.member.dto.request.UpdateBirthRequestDTO;
import com.pawly.domain.member.dto.request.UpdateNicknameRequestDTO;
import com.pawly.domain.member.dto.response.MemberProfileResponseDTO;
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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public ApiResponse<?> signUp(@RequestPart(name = "asset", required = false) MultipartFile asset,
                                 @RequestPart(name = "data") SignUpRequestDTO signUpRequestDTO) {
        try {
            return memberService.signUp(asset, signUpRequestDTO);
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
                cookie.setDomain("k11d104.p.ssafy.io"); // 생성 시와 동일한 도메인 설정
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
                .domain("k11d104.p.ssafy.io")
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

    @GetMapping("/profile")
    public ApiResponse<?> getProfile(Authentication authentication) {
        try {
            Member member = memberService.findByEmail(authentication.getName());
            System.out.println(member);
            if(member == null) {
                return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
            }

            MemberProfileResponseDTO dto = memberService.getProfile(member.getMemberId());
            return ApiResponse.createSuccess(dto, "조회 성공 ");

        } catch (Exception e) {
            return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
        }
    }

    @GetMapping("/{memberId}")
    public ApiResponse<?> getProfile(@PathVariable Long memberId) {
        try {
            Member member = memberService.findByMemberId(memberId);
            System.out.println(member);
            if(member == null) {
                return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
            }

            MemberProfileResponseDTO dto = memberService.getProfile(member.getMemberId());
            return ApiResponse.createSuccess(dto, "조회 성공 ");

        } catch (Exception e) {
            return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
        }
    }

    @PostMapping("/check/exist-nickname")
    public ApiResponse<?> getNickname(@RequestBody UpdateNicknameRequestDTO updateNicknameRequestDTO) {
        try {
            boolean isDuplicate = memberService.checkNickname(updateNicknameRequestDTO.getNickname());

            return ApiResponse.createSuccess(isDuplicate, "성공적으로 닉네임 중복 조회 성공");
        } catch (Exception e) {
            return ApiResponse.createError(ErrorCode.NICKNAME_NOT_FOUND);
        }
    }

    @PatchMapping("/update-nickname")
    public ApiResponse<?> updateNickname(Authentication authentication, @RequestBody UpdateNicknameRequestDTO updateNicknameRequestDto) {
        try {
            Member member = memberService.findByEmail(authentication.getName());
            if (member == null) {
                return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
            }
            String nickname = updateNicknameRequestDto.getNickname();

            if(memberService.checkNickname(nickname)) {
                return ApiResponse.createError(ErrorCode.NICKNAME_ALREADY_USED);
            }
            memberService.updateNickname(member, nickname);
            return ApiResponse.createSuccess(null, "닉네임 업데이트 성공");

        } catch (Exception e) {
            return ApiResponse.createError(ErrorCode.USER_UPDATE_FAILED);
        }
    }

    @PatchMapping("/update-birth")
    public ApiResponse<?> updateBirth(Authentication authentication, @RequestBody UpdateBirthRequestDTO updateBirthRequestDTO) {
        try {
            Member member = memberService.findByEmail(authentication.getName());
            if (member == null) {
                return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
            }
            String birth = updateBirthRequestDTO.getBirth();

            memberService.updateBirth(member, birth);
            return ApiResponse.createSuccess(null, "생일 업데이트 성공");

        } catch (Exception e) {
            return ApiResponse.createError(ErrorCode.USER_UPDATE_FAILED);
        }
    }

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
                cookie.setDomain("k11d104.p.ssafy.io"); // 생성 시와 동일한 도메인 설정
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