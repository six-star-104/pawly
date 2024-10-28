package com.pawly.domain.friend.service;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.friend.entity.FriendRequest;
import com.pawly.domain.friend.repository.FriendRepository;
import com.pawly.domain.friend.repository.FriendRequestRepository;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FriendService {

    private final FriendRepository friendRepository;
    private final FriendRequestRepository friendRequestRepository;
    private final MemberRepository memberRepository;
    private static final Long memberId = 1L;

    @Transactional
    public ApiResponse<Object> friend(Long memberId2) {
        Optional<Member> senderOptional = checkMemberId(memberId);
        Optional<Member> receiverOptional = checkMemberId(memberId2);

        if (senderOptional.isEmpty() || receiverOptional.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
        if(!checkIfFriendExists(memberId2)) return ApiResponse.createError(ErrorCode.ALREADY_FRIEND);
        if(!checkRequestFriendExists(memberId2)) return ApiResponse.createError(ErrorCode.FRIEND_REQUEST_ALREADY_SENT);
        if(!checkResponseFriendExists(memberId2)) return ApiResponse.createError(ErrorCode.FRIEND_REQUEST_ALREADY_RECEIVED);

        Member sender = senderOptional.get();
        Member receiver = receiverOptional.get();

        friendRequestRepository.save(new FriendRequest(sender, receiver));
        return ApiResponse.createSuccessWithNoContent();
    }

    private Optional<Member> checkMemberId(Long memberId) {
        return memberRepository.findById(memberId);
    }

    private boolean checkIfFriendExists(Long memberId2) {
        return friendRepository.existsByMemberAndTargetMember(memberId, memberId2);
    }

    private boolean checkRequestFriendExists(Long memberId2) {
        return friendRequestRepository.existsRequest(memberId, memberId2);
    }

    private boolean checkResponseFriendExists(Long memberId2) {
        return friendRequestRepository.existsResponse(memberId, memberId2);
    }
}
