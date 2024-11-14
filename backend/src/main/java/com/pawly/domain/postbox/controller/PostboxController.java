package com.pawly.domain.postbox.controller;

import com.pawly.domain.postbox.service.PostboxService;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/postbox")
@RequiredArgsConstructor
public class PostboxController {
    private final PostboxService postboxService;

    @GetMapping("/ar/{latitude}/{longitude}")
    public ApiResponse<?> postboxArRead(Authentication authentication, @PathVariable Double latitude, @PathVariable Double longitude) {
        String name = authentication.getName();
        return postboxService.postboxArRead(name, latitude, longitude);
    }

    @GetMapping("/map/{latitude}/{longitude}")
    public ApiResponse<?> postboxMapRead(Authentication authentication, @PathVariable Double latitude, @PathVariable Double longitude) {
        String name = authentication.getName();
        return postboxService.postboxMapRead(name, latitude, longitude);
    }
}

