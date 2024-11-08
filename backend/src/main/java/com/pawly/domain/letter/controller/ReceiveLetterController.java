package com.pawly.domain.letter.controller;

import com.pawly.domain.letter.dto.request.LetterReactionRequestDTO;
import com.pawly.domain.letter.dto.request.LetterReportRequestDto;
import com.pawly.domain.letter.service.ReceiveLetterService;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.service.MemberService;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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
        } catch (Exception e) {
            return ApiResponse.createError(ErrorCode.LETTER_NOT_FOUND);
        }
    }

    @GetMapping("/{receiveLetterId}")
    public ApiResponse<?> getReceiveLetter(Authentication authentication, @PathVariable Long receiveLetterId) {
        try {
            Member member = memberService.findByEmail(authentication.getName());

            if (member == null) {
                return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
            }

            return ApiResponse.createSuccess(receiveLetterService.getLetter(member, receiveLetterId),
                "편지 조회 성공");
        } catch (Exception e) {
            return ApiResponse.createError(ErrorCode.LETTER_NOT_FOUND);
        }
    }

    @DeleteMapping("/{receiveLetterId}")
    public ApiResponse<?> deleteLetter(Authentication authentication, @PathVariable Long receiveLetterId) {
        try {
            Member member = memberService.findByEmail(authentication.getName());

            if (member == null) {
                return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
            }

            receiveLetterService.deleteLetter(member, receiveLetterId);

            return ApiResponse.createSuccessWithNoContent("편지 삭제 성공");
        } catch (Exception e) {
            return ApiResponse.createError(ErrorCode.LETTER_DELETE_FAILED);
        }
    }

    @PatchMapping("/{receiveLetterId}")
    public ApiResponse<?> addReaction(Authentication authentication, @RequestBody LetterReactionRequestDTO letterReactionRequestDTO,
        @PathVariable Long receiveLetterId) {
        try {
            Member member = memberService.findByEmail(authentication.getName());

            if (member == null) {
                return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
            }

            receiveLetterService.addReaction(member, letterReactionRequestDTO, receiveLetterId);

            return ApiResponse.createSuccessWithNoContent("편지 반응 성공");
        } catch (Exception e) {
            return ApiResponse.createError(ErrorCode.LETTER_REACTION_FAILED);
        }
    }

    @PostMapping("/{receiveLetterId}")
    public ApiResponse<?> reportLetter(Authentication authentication, @PathVariable Long receiveLetterId,
                                       @Valid @RequestBody LetterReportRequestDto letterReportRequestDto) {
        return receiveLetterService.letterReport(authentication.getName(), receiveLetterId, letterReportRequestDto);
    }
}
