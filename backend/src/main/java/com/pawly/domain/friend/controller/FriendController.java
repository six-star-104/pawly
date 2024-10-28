package com.pawly.domain.friend.controller;

import com.pawly.domain.friend.dto.FriendResponse;
import com.pawly.domain.friend.service.FriendService;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/friend")
public class FriendController {

    private final FriendService friendService;

    @GetMapping("/request")
    public ResponseEntity<?> requestFriend() {
        ApiResponse<List<FriendResponse>> response = friendService.requestFriend();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/response")
    public ResponseEntity<?> responseFriend() {
        ApiResponse<List<FriendResponse>> response = friendService.responseFriend();
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<?> getFriends() {
        ApiResponse<List<FriendResponse>> response = friendService.getFriendsByMemberId();
        return ResponseEntity.ok(response);
    }
}
