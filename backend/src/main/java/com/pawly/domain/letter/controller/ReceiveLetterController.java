package com.pawly.domain.letter.controller;

import com.pawly.domain.letter.service.ReceiveLetterService;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.service.MemberService;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/receiveLetter")
public class ReceiveLetterController {

    private final MemberService memberService;
    private final ReceiveLetterService receiveLetterService;

    @GetMapping
    public ApiResponse<?> getReceiveLetters(Authentication authentication,
                                            @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber,
                                            @RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
                                            @RequestParam(name = "sortType", defaultValue = "desc") String sortType,
                                            @RequestParam(name = "sortBy", required = false, defaultValue = "createdAt") String sortBy) {
        try {
            Member member = memberService.findByEmail(authentication.getName());

            if (member == null) {
                return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
            }

            return ApiResponse.createSuccess(
                receiveLetterService.getReceiveLetters(member, pageNumber, pageSize, sortType, sortBy),
                "편지 조회 성공");
        }
        catch (Exception e) {
            System.out.println(e);
            return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
        }
    }
}
