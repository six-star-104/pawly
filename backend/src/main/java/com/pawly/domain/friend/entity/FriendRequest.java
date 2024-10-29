package com.pawly.domain.friend.entity;

import com.pawly.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.util.Optional;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FriendRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long FriendRequestId;

    @ManyToOne
    @JoinColumn(name = "senderId")
    private Member senderId;

    @ManyToOne
    @JoinColumn(name = "receiverId")
    private Member receiverId;

    public FriendRequest(Member sender, Member receiver) {
        this.senderId = sender;
        this.receiverId = receiver;
    }
}
