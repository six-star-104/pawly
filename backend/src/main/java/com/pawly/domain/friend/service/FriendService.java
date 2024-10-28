package com.pawly.domain.friend.service;

import com.pawly.domain.friend.dto.FriendResponse;
import com.pawly.domain.friend.entity.FriendRequest;
import com.pawly.domain.friend.repository.FriendRepository;
import com.pawly.domain.friend.repository.FriendRequestRepository;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.pawly.global.response.ApiResponse;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FriendService {

    private final FriendRepository friendRepository;
    private final FriendRequestRepository friendRequestRepository;
    private final MemberRepository memberRepository;
    private static final Long memberId = 1L;

    public ApiResponse<List<FriendResponse>> requestFriend() {
        Optional<Member> memberOptional = memberRepository.findById(memberId);

        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            List<FriendRequest> friendRequests = friendRequestRepository.findBySenderId(member);

            List<FriendResponse> friendResponseList = friendRequests.stream()
                    .map(FriendResponse::requestList)
                    .collect(Collectors.toList());

            return ApiResponse.createSuccess(friendResponseList, "친구 신청한 목록 조회 성공"); // 성공 응답
        } else {
            return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
        }
    }

    public ApiResponse<List<FriendResponse>> responseFriend() {
        Optional<Member> memberOptional = memberRepository.findById(memberId);

        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            List<FriendRequest> friendRequests = friendRequestRepository.findByReceiverId(member);

            List<FriendResponse> friendResponseList = friendRequests.stream()
                    .map(FriendResponse::responseList)
                    .collect(Collectors.toList());

            return ApiResponse.createSuccess(friendResponseList, "친구 신청받은 목록 조회 성공"); // 성공 응답
        } else {
            return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
        }
    }
}
