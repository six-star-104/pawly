package com.pawly.domain.friend.service;

import com.pawly.domain.friend.entity.Friend;
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

    @Transactional
    public ApiResponse<Object> friend(Member member, Long memberId2) {
        Optional<Member> receiverOptional = checkMemberId(memberId2);
        Long memberId = member.getMemberId();

        if (receiverOptional.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
        if(!checkIfFriendExists(memberId, memberId2)) return ApiResponse.createError(ErrorCode.ALREADY_FRIEND);
        if(!checkRequestFriendExists(memberId, memberId2)) return ApiResponse.createError(ErrorCode.FRIEND_REQUEST_ALREADY_SENT);
        if(!checkResponseFriendExists(memberId, memberId2)) return ApiResponse.createError(ErrorCode.FRIEND_REQUEST_ALREADY_RECEIVED);

        Member receiver = receiverOptional.get();

        friendRequestRepository.save(new FriendRequest(member, receiver));
        return ApiResponse.createSuccessWithNoContent("친구 신청 성공");
    }

    @Transactional
    public ApiResponse<Object> friendDelete(Member member, Long memberId2) {
        Optional<Member> receiverOptional = checkMemberId(memberId2);

        if (receiverOptional.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Member receiver = receiverOptional.get();

        Optional<Friend> friendOptional = friendRepository.findByMemberAndTargetMember(member.getMemberId(), receiver.getMemberId());

        if (friendOptional.isEmpty()) {
            return ApiResponse.createError(ErrorCode.NOT_FRIEND);
        }

        Friend friend = friendOptional.get();
        friend.delete();

        return ApiResponse.createSuccessWithNoContent("친구 삭제 성공");
    }

    private Optional<Member> checkMemberId(Long memberId) {
        return memberRepository.findById(memberId);
    }

    private boolean checkIfFriendExists(Long memberId, Long memberId2) {
        return friendRepository.existsByMemberAndTargetMember(memberId, memberId2);
    }

    private boolean checkRequestFriendExists(Long memberId, Long memberId2) {
        return friendRequestRepository.existsRequest(memberId, memberId2);
    }

    private boolean checkResponseFriendExists(Long memberId, Long memberId2) {
        return friendRequestRepository.existsResponse(memberId, memberId2);
    }
}
