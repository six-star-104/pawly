package com.pawly.domain.postbox.controller;

import com.pawly.domain.postbox.controller.dto.PostboxReadRequest;
import com.pawly.domain.postbox.service.PostboxService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/postbox")
@RequiredArgsConstructor
public class PostboxController {
    private final PostboxService postboxService;

    @GetMapping("/ar")
    public ResponseEntity<?> postboxArRead(@RequestBody PostboxReadRequest postboxReadRequest) {
        // 토큰

        postboxService.postboxArRead(postboxReadRequest);
    }

}
