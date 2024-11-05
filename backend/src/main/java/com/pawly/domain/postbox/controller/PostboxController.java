package com.pawly.domain.postbox.controller;

import com.pawly.domain.member.service.MemberService;
import com.pawly.domain.postbox.controller.dto.PostboxReadRequest;
import com.pawly.domain.postbox.service.PostboxService;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/postbox")
@RequiredArgsConstructor
public class PostboxController {
    private final PostboxService postboxService;

    @GetMapping("/ar")
    public ApiResponse<?> postboxArRead(Authentication authentication, @RequestBody PostboxReadRequest postboxReadRequest) {
        String name = authentication.getName();
        return postboxService.postboxArRead(postboxReadRequest.toDto(name));
    }

    @GetMapping("/map")
    public ApiResponse<?> postboxMapRead(Authentication authentication, @RequestBody PostboxReadRequest postboxReadRequest) {
        String name = authentication.getName();
        return postboxService.postboxMapRead(postboxReadRequest.toDto(name));
    }
}
