package com.pawly.domain.friend.service;

import com.pawly.domain.friend.dto.FriendResponse;
import com.pawly.domain.friend.repository.FriendRepository;
import com.pawly.domain.friend.repository.FriendRequestRepository;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.pawly.global.response.ApiResponse;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FriendListService {

    private final FriendRepository friendRepository;
    private final FriendRequestRepository friendRequestRepository;
    private final MemberRepository memberRepository;

    public ApiResponse<?> requestFriend(Member member) {
        List<FriendResponse> friendResponseList = friendRequestRepository.findBySenderId(member).stream()
                .map(FriendResponse::requestList)
                .collect(Collectors.toList());

        return ApiResponse.createSuccess(friendResponseList, "친구 신청한 목록 조회 성공");
    }

    public ApiResponse<?> responseFriend(Member member) {
        List<FriendResponse> friendResponseList = friendRequestRepository.findByReceiverId(member).stream()
                .map(FriendResponse::responseList)
                .collect(Collectors.toList());

        return ApiResponse.createSuccess(friendResponseList, "친구 신청받은 목록 조회 성공");
    }

    public ApiResponse<List<FriendResponse>> getFriendsByMemberId(Member member) {
        List<FriendResponse> friendResponseDtoList = friendRepository.findFriendsByMemberId(member.getMemberId()).stream()
                .map(friend -> {
                    Member targetMemberId = friend.getMemberId1().getMemberId().equals(member.getMemberId()) ? friend.getMemberId2() : friend.getMemberId1();

                    Optional<Member> targetMemberOptional = memberRepository.findById(targetMemberId.getMemberId());
                    if (targetMemberOptional.isPresent()) {
                        Member targetMember = targetMemberOptional.get();
                        return new FriendResponse(
                                friend.getFriendId(),
                                targetMemberId.getMemberId(),
                                targetMember.getName(),
                                targetMember.getNickname(),
                                targetMember.getAssets()
                        );
                    } else {
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .toList();

        return ApiResponse.createSuccess(friendResponseDtoList, "친구 목록 조회 성공");
    }
}