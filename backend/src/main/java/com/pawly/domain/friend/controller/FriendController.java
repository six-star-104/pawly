package com.pawly.domain.friend.controller;

import com.pawly.domain.friend.dto.FriendRequestDto;
import com.pawly.domain.friend.dto.FriendResponse;
import com.pawly.domain.friend.service.FriendListService;
import com.pawly.domain.friend.service.FriendService;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/friend")
public class FriendController {

    private final FriendListService friendListService;
    private final FriendService friendService;

    @GetMapping("/request")
    public ResponseEntity<?> requestFriend() {
        ApiResponse<List<FriendResponse>> response = friendListService.requestFriend();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/response")
    public ResponseEntity<?> responseFriend() {
        ApiResponse<List<FriendResponse>> response = friendListService.responseFriend();
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<?> getFriends() {
        ApiResponse<List<FriendResponse>> response = friendListService.getFriendsByMemberId();
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> addFriend(@RequestBody FriendRequestDto friendRequestDto) {
        ApiResponse<?> response = friendService.friend(friendRequestDto.getMemberId());
        return ResponseEntity.ok(response);
    }
}
