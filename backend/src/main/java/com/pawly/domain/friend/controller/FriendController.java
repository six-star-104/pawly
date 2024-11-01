package com.pawly.domain.friend.controller;

import com.pawly.domain.friend.dto.FriendRequestDto;
import com.pawly.domain.friend.dto.FriendStatusDto;
import com.pawly.domain.friend.service.FriendListService;
import com.pawly.domain.friend.service.FriendService;
import com.pawly.domain.friend.service.FriendStatusService;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.service.MemberService;
import com.pawly.global.exception.ErrorCode;
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
    private final MemberService memberService;

    @GetMapping("/request")
    public ApiResponse<?> requestFriend(Authentication authentication) {
        try {
            Member member = memberService.findByEmail(authentication.getName());
            return friendListService.requestFriend(member);
        }
        catch (Exception e) {
            return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
        }
    }

    @GetMapping("/response")
    public ApiResponse<?> responseFriend(Authentication authentication) {
        try {
            Member member = memberService.findByEmail(authentication.getName());
            return friendListService.responseFriend(member);
        }
        catch (Exception e) {
            return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
        }
    }

    @GetMapping
    public ApiResponse<?> getFriends(Authentication authentication) {
        try {
            Member member = memberService.findByEmail(authentication.getName());
            return friendListService.getFriendsByMemberId(member);
        }
        catch (Exception e) {
            return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
        }
    }

    @PostMapping
    public ApiResponse<?> addFriend(Authentication authentication, @RequestBody FriendRequestDto friendRequestDto) {
        try {
            Member member = memberService.findByEmail(authentication.getName());
            return friendService.friend(member, friendRequestDto.getMemberId());
        }
        catch (Exception e) {
            return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
        }
    }

    @DeleteMapping
    public ApiResponse<?> deleteFriend(Authentication authentication, @RequestBody FriendRequestDto friendRequestDto) {
        try {
            Member member = memberService.findByEmail(authentication.getName());
            return friendService.friendDelete(member, friendRequestDto.getMemberId());
        }
        catch (Exception e) {
            return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
        }
    }

    @PatchMapping
    public ApiResponse<?> updateFriend(Authentication authentication, @RequestBody FriendStatusDto friendStatusDto) {
        if(authentication == null) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
        return friendStatusService.updateFriend(friendStatusDto.getFriendId(), friendStatusDto.getStatus());
    }
}
