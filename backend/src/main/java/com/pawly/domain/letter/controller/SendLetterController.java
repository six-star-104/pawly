package com.pawly.domain.letter.controller;

import com.pawly.domain.letter.dto.request.LetterRequestDTO;
import com.pawly.domain.letter.service.SendLetterService;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.service.MemberService;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sendLetter")
public class SendLetterController {

    private final MemberService memberService;
    private final SendLetterService sendLetterService;

    @GetMapping
    public ApiResponse<?> getSendLetters(Authentication authentication,
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
                sendLetterService.getSendLetters(member, pageNumber, pageSize, sortType, sortBy),
                "편지 조회 성공");
        } catch (Exception e) {
            return ApiResponse.createError(ErrorCode.LETTER_NOT_FOUND);
        }
    }

    @GetMapping("/{sendLetterId}")
    public ApiResponse<?> getSendLetter(Authentication authentication, @PathVariable Long sendLetterId) {
        try {
            Member member = memberService.findByEmail(authentication.getName());

            if (member == null) {
                return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
            }

            return ApiResponse.createSuccess(sendLetterService.getLetter(member, sendLetterId),
                "편지 조회 성공");
        } catch (Exception e) {
            return ApiResponse.createError(ErrorCode.LETTER_NOT_FOUND);
        }
    }

    @PostMapping()
    public ApiResponse<?> sendLetter(Authentication authentication, @RequestBody LetterRequestDTO letterRequestDTO) {
        try {
            Member member = memberService.findByEmail(authentication.getName());

            if (member == null) {
                return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
            }

            sendLetterService.sendLetter(member, letterRequestDTO);

            return ApiResponse.createSuccessWithNoContent("편지 보내기 성공");
        } catch (Exception e) {
            return ApiResponse.createError(ErrorCode.LETTER_SEND_FAILED);
        }
    }

    @DeleteMapping("/{sendLetterId}")
    public ApiResponse<?> deleteSendLetter(Authentication authentication, @PathVariable Long sendLetterId) {
        try {
            Member member = memberService.findByEmail(authentication.getName());

            if (member == null) {
                return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
            }

            sendLetterService.deleteLetter(member, sendLetterId);

            return ApiResponse.createSuccessWithNoContent("편지 삭제 성공");
        } catch (Exception e) {
            return ApiResponse.createError(ErrorCode.LETTER_DELETE_FAILED);
        }
    }
}
