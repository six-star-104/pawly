package com.pawly.domain.postIt.controller;

import com.pawly.domain.postIt.controller.dto.PostItCreateRequest;
import com.pawly.domain.postIt.controller.dto.PostItUpdateRequest;
import com.pawly.domain.postIt.controller.dto.PostReportRequest;
import com.pawly.domain.postIt.service.PostItService;
import com.pawly.global.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/postit")
@RequiredArgsConstructor
public class PostItController {
    private final PostItService postItService;

    @PostMapping
    public ApiResponse<?> createPostIt(Authentication authentication, @Valid @RequestBody PostItCreateRequest postItCreateRequest) {
        return postItService.createPostIt(postItCreateRequest.toDto(authentication.getName()));
    }

    @GetMapping("/{postitId}")
    public ApiResponse<?> readPostIt(Authentication authentication, @PathVariable Long postitId) {
        return postItService.readPostIt(authentication.getName(), postitId);
    }

    @PatchMapping("/{postitId}")
    public ApiResponse<?> updatePostIt(Authentication authentication, @PathVariable Long postitId,
                                            @Valid @RequestBody PostItUpdateRequest postItUpdateRequest) {
        return postItService.updatePostIt(postItUpdateRequest.toDto(authentication.getName(), postitId));
    }

    @DeleteMapping("/{postitId}")
    public ApiResponse<?> deletePostIt(Authentication authentication, @PathVariable Long postitId) {
        return postItService.deletePostIt(authentication.getName(), postitId);
    }

    @PostMapping("/{postitId}")
    public ApiResponse<?> reportPostIt(Authentication authentication, @PathVariable Long postitId,
                                                    @Valid @RequestBody PostReportRequest postReportRequest) {
        return postItService.reportPostIt(postReportRequest.toDto(authentication.getName(), postitId));
    }
}
