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
@Table(name = "friend_request")
public class FriendRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "friend_request_id")
    private Long friendRequestId;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private Member senderId;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private Member receiverId;

    public FriendRequest(Member sender, Member receiver) {
        this.senderId = sender;
        this.receiverId = receiver;
    }
}
