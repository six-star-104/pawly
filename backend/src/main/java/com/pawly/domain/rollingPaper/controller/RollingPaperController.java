package com.pawly.domain.rollingPaper.controller;

import com.pawly.domain.rollingPaper.controller.dto.RollingPaperCreateRequest;
import com.pawly.domain.rollingPaper.service.RollingPaperService;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/rollingpaper")
@RequiredArgsConstructor
public class RollingPaperController {
    private final RollingPaperService rollingPaperService;

    @PostMapping
    public ResponseEntity<?> createRollingPaper(@Valid @RequestBody RollingPaperCreateRequest rollingPaperCreateRequest) {
        // 토큰 name
        Long memberId  = 1L;
        ApiResponse<?> response = rollingPaperService.createRollingPaper(rollingPaperCreateRequest.toDto(memberId));
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<?> readAllRollingPaper(@PageableDefault(size = 10) Pageable pageable) {
        // 토큰
        Long memberId = 1L;
        ApiResponse<?> response = rollingPaperService.readAllRollingPaper(memberId, pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{rollingPaperId}")
    public ResponseEntity<?> readRollingPaper(@PathVariable Long rollingPaperId, @PageableDefault(size = 10) Pageable pageable) {
        // 토큰
        Long memberId = 1L;
        ApiResponse<?> response = rollingPaperService.readRollingPaper(memberId, rollingPaperId, pageable);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{rollingPaperId}")
    public ResponseEntity<?> deleteRollingPaper(@PathVariable Long rollingPaperId) {
        // 토큰
        Long memberId = 1L;
        ApiResponse<?> response = rollingPaperService.deleteRollingPaper(memberId, rollingPaperId);
        return ResponseEntity.ok(response);
    }


}
