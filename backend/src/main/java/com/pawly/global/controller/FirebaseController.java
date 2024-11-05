package com.pawly.global.controller;

import com.pawly.global.dto.FcmMessageRequestDto;
import com.pawly.global.service.FirebaseCloudMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class FirebaseController {

    private final FirebaseCloudMessageService firebaseCloudMessageService;

    @PostMapping("/api/fcm/sendMessage")
    public ResponseEntity<String> sendMessage(@RequestBody FcmMessageRequestDto requestDto) {
        String response = firebaseCloudMessageService.sendMessage(requestDto);
        return ResponseEntity.ok(response);
    }
}