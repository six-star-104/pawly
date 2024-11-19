package com.pawly.domain.friend.controller;

import com.pawly.domain.friend.dto.FriendRequestDto;
import com.pawly.domain.friend.dto.FriendStatusDto;
import com.pawly.domain.friend.service.FriendListService;
import com.pawly.domain.friend.service.FriendService;
import com.pawly.domain.friend.service.FriendStatusService;
import com.pawly.domain.member.service.MemberService;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/friend")
public class FriendController {

    private final FriendListService friendListService;
    private final FriendService friendService;
    private final FriendStatusService friendStatusService;

    @GetMapping("/request")
    public ApiResponse<?> requestFriend(Authentication authentication) {
        return friendListService.requestFriend(authentication.getName());
    }

    @GetMapping("/response")
    public ApiResponse<?> responseFriend(Authentication authentication) {
        return friendListService.responseFriend(authentication.getName());
    }

    @GetMapping
    public ApiResponse<?> getFriends(Authentication authentication) {
        return friendListService.getFriends(authentication.getName());
    }

    @PostMapping
    public ApiResponse<?> addFriend(Authentication authentication, @RequestBody FriendRequestDto friendRequestDto) {
        return friendService.addFriend(authentication.getName(), friendRequestDto.getMemberId());
    }

    @DeleteMapping
    public ApiResponse<?> deleteFriend(Authentication authentication, @RequestBody FriendRequestDto friendRequestDto) {
        return friendService.friendDelete(authentication.getName(), friendRequestDto.getMemberId());
    }

    @PatchMapping
    public ApiResponse<?> updateFriend(Authentication authentication, @RequestBody FriendStatusDto friendStatusDto) {
        return friendStatusService.updateFriend(authentication.getName(), friendStatusDto.getFriendId(), friendStatusDto.getStatus());
    }

    @DeleteMapping("/request")
    public ApiResponse<?> requestFriend(Authentication authentication, @RequestBody FriendRequestDto requestDto) {
        return friendStatusService.requestFriend(authentication.getName(), requestDto.getMemberId());
    }
}
