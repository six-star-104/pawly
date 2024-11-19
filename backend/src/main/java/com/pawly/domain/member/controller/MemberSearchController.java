package com.pawly.domain.member.controller;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.service.MemberSearchService;
import com.pawly.domain.member.service.MemberService;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
@Slf4j
public class MemberSearchController {

    private final MemberSearchService memberSearchService;
    private final MemberService memberService;

    @GetMapping("/{nickname}")
    public ApiResponse<?> findMember(Authentication authentication, @PathVariable String nickname) throws Exception{
        Member member = memberService.findByEmail(authentication.getName());
        return memberSearchService.memberSearch(nickname, member);
    }
}
