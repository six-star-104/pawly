package com.pawly.domain.friend.dto;

import com.pawly.domain.friend.entity.Friend;
import com.pawly.domain.friend.entity.FriendRequest;
import com.pawly.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FriendResponse {

    private Long friendId;
    private Long memberId;
    private String name;
    private String nickname;
    private String assets;

    public static FriendResponse requestList(FriendRequest friend) {
        return FriendResponse.builder()
                .friendId(friend.getFriendRequestId())
                .memberId(friend.getReceiverId().getMemberId())
                .name(friend.getReceiverId().getName())
                .nickname(friend.getReceiverId().getNickname())
                .assets(friend.getReceiverId().getAssets())
                .build();
    }

    public static FriendResponse responseList(FriendRequest friend) {
        return FriendResponse.builder()
                .friendId(friend.getFriendRequestId())
                .memberId(friend.getSenderId().getMemberId())
                .name(friend.getSenderId().getName())
                .nickname(friend.getSenderId().getNickname())
                .assets(friend.getSenderId().getAssets())
                .build();
    }

//    public static FriendResponse friendList(Friend friend) {
//        return FriendResponse.builder()
//                .friendId(friend.getFriendId())
//                .memberId(friend.get())
//                .name(friend.getSenderId().getName())
//                .nickname(friend.getSenderId().getNickname())
//                .assets(friend.getSenderId().getAssets())
//                .build();
//    }
}
