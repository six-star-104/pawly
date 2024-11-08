package com.pawly.domain.theme.controller;

import com.pawly.domain.member.service.MemberService;
import com.pawly.domain.theme.service.ThemeService;
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
@RequestMapping("/api/theme")
public class ThemeController {

    private final ThemeService themeService;
    private final MemberService memberService;

    @GetMapping
    public ApiResponse<?> getTheme(Authentication authentication) {
        return  themeService.getTheme(authentication.getName());
    }
}
