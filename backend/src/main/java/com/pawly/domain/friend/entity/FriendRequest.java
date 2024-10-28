package com.pawly.domain.friend.entity;

import com.pawly.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

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
}
