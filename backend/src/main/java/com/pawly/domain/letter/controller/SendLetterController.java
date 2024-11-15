package com.pawly.domain.letter.controller;

import com.pawly.domain.letter.dto.request.LetterRequestDTO;
import com.pawly.domain.letter.service.SendLetterService;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sendLetter")
public class SendLetterController {

    private final SendLetterService sendLetterService;

    @GetMapping
    public ApiResponse<?> getSendLetters(Authentication authentication,
                                         @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber,
                                         @RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
                                         @RequestParam(name = "sortType", defaultValue = "desc") String sortType,
                                         @RequestParam(name = "sortBy", required = false, defaultValue = "createdAt") String sortBy) {
        return sendLetterService.getSendLetters(authentication.getName(), pageNumber, pageSize, sortType, sortBy);
    }

    @GetMapping("/{sendLetterId}")
    public ApiResponse<?> getSendLetter(Authentication authentication, @PathVariable Long sendLetterId) {
        return sendLetterService.getLetter(authentication.getName(), sendLetterId);
    }

    @PostMapping()
    public ApiResponse<?> sendLetter(Authentication authentication, @RequestPart(name = "picture", required = false) MultipartFile picture,
                                                                    @RequestPart(name = "data") LetterRequestDTO letterRequestDTO) {
        try {
            return sendLetterService.sendLetter(authentication.getName(), letterRequestDTO, picture);
        } catch (Exception e) {
            return ApiResponse.createError(ErrorCode.LETTER_SEND_FAILED);
        }
    }

    @DeleteMapping("/{sendLetterId}")
    public ApiResponse<?> deleteSendLetter(Authentication authentication, @PathVariable Long sendLetterId) {
        return sendLetterService.deleteLetter(authentication.getName(), sendLetterId);
    }
}
