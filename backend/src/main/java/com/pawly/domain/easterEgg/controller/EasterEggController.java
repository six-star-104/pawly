package com.pawly.domain.easterEgg.controller;

import com.pawly.domain.easterEgg.service.EasterEggService;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.service.MemberService;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/easteregg")
public class EasterEggController {

    private final EasterEggService easterEggService;
    private final MemberService memberService;

    // 도전과제 생성 테스트용
    @GetMapping("/test")
    public ApiResponse<?> create(Authentication authentication) {
        try {
            Member member = memberService.findByEmail(authentication.getName());
            easterEggService.initializeChallengesForNewUser(member.getMemberId());
            return ApiResponse.createSuccessWithNoContent("도전과제 생성 성공");
        }
        catch (Exception e) {
            return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
        }
    }

    @GetMapping
    public ApiResponse<?> getEasterEgg(Authentication authentication) {
        try {
            Member member = memberService.findByEmail(authentication.getName());
            return easterEggService.getEasterEgg(member.getMemberId());
        }
        catch (Exception e) {
            return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
        }
    }
}
