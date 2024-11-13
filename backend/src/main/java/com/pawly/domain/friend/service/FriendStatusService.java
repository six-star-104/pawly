package com.pawly.domain.friend.service;

import com.pawly.domain.friend.entity.Friend;
import com.pawly.domain.friend.entity.FriendRequest;
import com.pawly.domain.friend.repository.FriendRepository;
import com.pawly.domain.friend.repository.FriendRequestRepository;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.service.MemberServiceImpl;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import com.pawly.global.dto.FcmMessageRequestDto;
import com.pawly.global.service.FirebaseCloudMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FriendStatusService {

    private final FriendRepository friendRepository;
    private final FriendRequestRepository friendRequestRepository;
    private final FirebaseCloudMessageService firebaseCloudMessageService;
    private final MemberServiceImpl memberService;

    @Transactional
    public ApiResponse<?> updateFriend(String email, Long friendId, Boolean status) {
        Member member = memberService.findByEmail2(email);
        if (member == null) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Optional<FriendRequest> friendRequestOptional = friendRequestRepository.findByFriendRequestIdAndReceiverId(friendId, member);
        if (friendRequestOptional.isEmpty()) return ApiResponse.createError(ErrorCode.FRIEND_NOT_REQUEST);

        FriendRequest friendRequest = friendRequestOptional.get();
        Member sender = friendRequest.getSenderId();

        // 이미 친구
        if(!checkIfFriendExists(member.getMemberId(), sender.getMemberId())) return ApiResponse.createError(ErrorCode.ALREADY_FRIEND);

        if (status) {
            Optional<Friend> optionalFriend = friendRepository.findByFriend(member.getMemberId(), sender.getMemberId());
            if(optionalFriend.isEmpty()) {
                Friend friend = new Friend(sender, member);
                friendRepository.save(friend);
            }
            else {
                Friend friend = optionalFriend.get();
                friend.changeStatus();;
            }

            friendRequestRepository.delete(friendRequest);

            FcmMessageRequestDto request = new FcmMessageRequestDto(sender.getMemberId(), "친구가 추가되었습니다!", "함께 소중한 추억을 만들어가세요!");
            firebaseCloudMessageService.sendMessage(request);

            return ApiResponse.createSuccessWithNoContent("친구 수락 성공");
        }

        friendRequestRepository.delete(friendRequest);
        return ApiResponse.createSuccessWithNoContent("친구 거절 성공");
    }

    private boolean checkIfFriendExists(Long memberId, Long memberId2) {
        return friendRepository.existsByMemberAndTargetMember(memberId, memberId2);
    }
}
