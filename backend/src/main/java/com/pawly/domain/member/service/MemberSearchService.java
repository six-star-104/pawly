package com.pawly.domain.member.service;

import com.pawly.domain.friend.entity.Friend;
import com.pawly.domain.friend.entity.FriendRequest;
import com.pawly.domain.friend.repository.FriendRepository;
import com.pawly.domain.friend.repository.FriendRequestRepository;
import com.pawly.domain.member.dto.response.SearchResponseDto;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
@Slf4j
public class MemberSearchService {

    private final MemberRepository memberRepository;
    private final FriendRepository friendRepository;
    private final FriendRequestRepository friendRequestRepository;

    public ApiResponse<?> memberSearch(String nickname, Member member) {
        // 1. 닉네임에 해당하는 멤버 조회, 자신은 제외
        List<Member> members = memberRepository.findByNicknameContainingAndExcludeSelf(nickname, member.getMemberId());

        // 2. 모든 친구 요청 상태를 한 번에 조회하여 Map에 저장
        Map<Long, Integer> statusMap = new HashMap<>();

        List<FriendRequest> friendRequestsSent = friendRequestRepository.findBySenderId(member);
        List<FriendRequest> friendRequestsReceived = friendRequestRepository.findByReceiverId(member);
        List<Friend> friends = friendRepository.findByMemberId1AndDeleteFlagIsFalseOrMemberId2AndDeleteFlagIsFalse(member, member);

        // 친구 요청 상태 저장: 1 (자신이 요청한 경우)
        friendRequestsSent.forEach(request -> statusMap.put(request.getReceiverId().getMemberId(), 1));

        // 친구 요청 상태 저장: 2 (상대가 자신에게 요청한 경우)
        friendRequestsReceived.forEach(request -> statusMap.put(request.getSenderId().getMemberId(), 2));

        // 친구 관계 상태 저장: 3 (이미 친구인 경우)
        friends.forEach(friend -> {
            statusMap.put(friend.getMemberId1().equals(member) ? friend.getMemberId2().getMemberId() : friend.getMemberId1().getMemberId(), 3);
        });

        List<SearchResponseDto> responseList = new ArrayList<>();
        for (Member m : members) {
            int status = statusMap.getOrDefault(m.getMemberId(), 0);
            responseList.add(SearchResponseDto.info(m, status));
        }

        return ApiResponse.createSuccess(responseList, "유저 검색 성공");
    }


    @Transactional
    public ApiResponse<?> fcmToken(Member member, String fcmToken) {
        if(fcmToken != null) {
            member.setFcmToken(fcmToken);
            return ApiResponse.createSuccessWithNoContent("토큰 설정 성공");
        }
        return ApiResponse.createError(ErrorCode.NO_FCM_TOKEN);
    }
}