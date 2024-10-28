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
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long friendId;

    @ManyToOne
    @JoinColumn(name="memberId1")
    private Member memberId1;

    @ManyToOne
    @JoinColumn(name="memberId2")
    private Member memberId2;

    private Boolean deleteFlag;
}
