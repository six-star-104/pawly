package com.pawly.domain.letter.controller;

import com.pawly.domain.letter.dto.request.LetterReactionRequestDTO;
import com.pawly.domain.letter.dto.request.LetterReportRequestDto;
import com.pawly.domain.letter.service.ReceiveLetterService;
import com.pawly.global.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/receiveLetter")
public class ReceiveLetterController {

    private final ReceiveLetterService receiveLetterService;

    @GetMapping
    public ApiResponse<?> getReceiveLetters(Authentication authentication,
                                            @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber,
                                            @RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
                                            @RequestParam(name = "sortType", defaultValue = "desc") String sortType,
                                            @RequestParam(name = "sortBy", required = false, defaultValue = "createdAt") String sortBy) {
            return receiveLetterService.getReceiveLetters(authentication.getName(), pageNumber, pageSize, sortType, sortBy);
    }

    @GetMapping("/{receiveLetterId}")
    public ApiResponse<?> getReceiveLetter(Authentication authentication, @PathVariable Long receiveLetterId) {
        return receiveLetterService.getLetter(authentication.getName(), receiveLetterId);
    }

    @DeleteMapping("/{receiveLetterId}")
    public ApiResponse<?> deleteLetter(Authentication authentication, @PathVariable Long receiveLetterId) {
        return receiveLetterService.deleteLetter(authentication.getName(), receiveLetterId);

    }

    @PatchMapping("/{receiveLetterId}")
    public ApiResponse<?> addReaction(Authentication authentication, @RequestBody LetterReactionRequestDTO letterReactionRequestDTO,
        @PathVariable Long receiveLetterId) {
        return receiveLetterService.addReaction(authentication.getName(), letterReactionRequestDTO, receiveLetterId);
    }

    @PostMapping("/{receiveLetterId}")
    public ApiResponse<?> reportLetter(Authentication authentication, @PathVariable Long receiveLetterId,
                                       @Valid @RequestBody LetterReportRequestDto letterReportRequestDto) {
        return receiveLetterService.letterReport(authentication.getName(), receiveLetterId, letterReportRequestDto);
    }
}
