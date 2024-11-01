package com.pawly.domain.member.controller;

import com.pawly.domain.member.service.MemberSearchService;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
@Slf4j
public class MemberSearchController {

    private final MemberSearchService memberSearchService;

    @GetMapping("/{nickname}")
    public ApiResponse<?> findMember(@PathVariable String nickname) {
        return memberSearchService.memberSearch(nickname);
    }
}