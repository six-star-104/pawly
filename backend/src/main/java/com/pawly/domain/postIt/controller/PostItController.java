package com.pawly.domain.postIt.controller;

import com.pawly.domain.postIt.controller.dto.PostItCreateRequest;
import com.pawly.domain.postIt.controller.dto.PostItUpdateRequest;
import com.pawly.domain.postIt.controller.dto.PostReportRequest;
import com.pawly.domain.postIt.service.PostItService;
import com.pawly.global.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/postit")
@RequiredArgsConstructor
public class PostItController {
    private final PostItService postItService;

    @PostMapping
    public ResponseEntity<?> createPostIt(@Valid @RequestBody PostItCreateRequest postItCreateRequest){
        // 토큰
        Long memberId = 1L;
        ApiResponse<?> response = postItService.createPostIt(postItCreateRequest.toDto(memberId));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{postitId}")
    public ResponseEntity<?> readPostIt(@PathVariable Long postitId){
        // 토큰
        Long memberId = 1L;
        ApiResponse<?> response = postItService.readPostIt(memberId, postitId);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{postitId}")
    public ResponseEntity<?> updatePostIt(@PathVariable Long postitId, @Valid @RequestBody PostItUpdateRequest postItUpdateRequest){
        // 토큰
        Long memberId = 1L;
        ApiResponse<?> response = postItService.updatePostIt(postItUpdateRequest.toDto(memberId, postitId));
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{postitId}")
    public ResponseEntity<?> deletePostIt(@PathVariable Long postitId){
        // 토큰
        Long memberId = 1L;
        ApiResponse<?> response = postItService.deletePostIt(memberId, postitId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{postitId}")
    public ResponseEntity<?> reportPostIt(@PathVariable Long postitId, @Valid @RequestBody PostReportRequest postReportRequest){
        // 토큰
        Long memberId = 1L;
        ApiResponse<?> response = postItService.reportPostIt(postReportRequest.toDto(memberId, postitId));
        return ResponseEntity.ok(response);
    }


}
