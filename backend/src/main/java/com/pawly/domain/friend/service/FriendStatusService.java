package com.pawly.domain.friend.service;

import com.pawly.domain.friend.entity.Friend;
import com.pawly.domain.friend.entity.FriendRequest;
import com.pawly.domain.friend.repository.FriendRepository;
import com.pawly.domain.friend.repository.FriendRequestRepository;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FriendStatusService {

    private final FriendRepository friendRepository;
    private final FriendRequestRepository friendRequestRepository;

    @Transactional
    public ApiResponse<?> updateFriend(Long friendId, Boolean status) {
        Optional<FriendRequest> friendRequestOptional = friendRequestRepository.findById(friendId);
        if (friendRequestOptional.isEmpty()) return ApiResponse.createError(ErrorCode.FRIEND_NOT_REQUEST);

        FriendRequest friendRequest = friendRequestOptional.get();
        Member sender = friendRequest.getSenderId();
        Member receiver = friendRequest.getReceiverId();

        if (status) {
            Friend friend = new Friend(sender, receiver);
            friendRepository.save(friend);
            friendRequestRepository.delete(friendRequest);
            return ApiResponse.createSuccessWithNoContent("친구 수락 성공");
        }

        friendRequestRepository.delete(friendRequest);
        return ApiResponse.createSuccessWithNoContent("친구 거절 성공");
    }
}
