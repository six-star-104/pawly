package com.pawly.domain.friend.service;

import com.pawly.domain.friend.entity.Friend;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.friend.entity.FriendRequest;
import com.pawly.domain.friend.repository.FriendRepository;
import com.pawly.domain.friend.repository.FriendRequestRepository;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.domain.member.service.MemberServiceImpl;
import com.pawly.domain.missionStatus.service.EventMissionService;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import com.pawly.global.dto.FcmMessageRequestDto;
import com.pawly.global.service.FirebaseCloudMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FriendService {

    private final FriendRepository friendRepository;
    private final FriendRequestRepository friendRequestRepository;
    private final MemberRepository memberRepository;
    private final FirebaseCloudMessageService firebaseCloudMessageService;
    private final MemberServiceImpl memberService;
    private final EventMissionService eventMissionService;

    @Transactional
    public ApiResponse<Object> addFriend(String email, Long memberId2) {
        Member member = memberService.findByEmail2(email);
        if (member == null) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Optional<Member> receiverOptional = checkMemberId(memberId2);
        Long memberId = member.getMemberId();

        if (receiverOptional.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
        if(Objects.equals(memberId, memberId2)) return ApiResponse.createError(ErrorCode.SELF_FRIEND_REQUEST);
        if(!checkIfFriendExists(memberId, memberId2)) return ApiResponse.createError(ErrorCode.ALREADY_FRIEND);
        if(!checkRequestFriendExists(memberId, memberId2)) return ApiResponse.createError(ErrorCode.FRIEND_REQUEST_ALREADY_SENT);
        if(!checkResponseFriendExists(memberId, memberId2)) return ApiResponse.createError(ErrorCode.FRIEND_REQUEST_ALREADY_RECEIVED);

        Member receiver = receiverOptional.get();

        friendRequestRepository.save(new FriendRequest(member, receiver));

        FcmMessageRequestDto request = new FcmMessageRequestDto(receiver.getMemberId(), "새로운 친구 신청이 도착했습니다!", "새로운 친구가 당신에게 손을 내밀었어요. 친구가 되어 주세요!");
        firebaseCloudMessageService.sendMessage(request);

        eventMissionService.processEventFriendAndCollection(memberId, memberId2, 1);
        eventMissionService.checkEventFriendAndCollection(memberId, 1, 6L);

        return ApiResponse.createSuccessWithNoContent("친구 신청 성공");
    }

    @Transactional
    public ApiResponse<Object> friendDelete(String email, Long memberId2) {
        Member member = memberService.findByEmail2(email);
        if (member == null) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Optional<Member> receiverOptional = checkMemberId(memberId2);

        if (receiverOptional.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Member receiver = receiverOptional.get();

        Optional<Friend> friendOptional = friendRepository.findByMemberAndTargetMember(member.getMemberId(), receiver.getMemberId());

        if (friendOptional.isEmpty()) {
            return ApiResponse.createError(ErrorCode.NOT_FRIEND);
        }

        Friend friend = friendOptional.get();
        friend.changeStatus();

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
