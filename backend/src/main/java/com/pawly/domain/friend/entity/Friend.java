package com.pawly.domain.friend.entity;

import com.pawly.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "friend")
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "friend_id")
    private Long friendId;

    @ManyToOne
    @JoinColumn(name="member_id1")
    private Member memberId1;

    @ManyToOne
    @JoinColumn(name="member_id2")
    private Member memberId2;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "delete_flag")
    private Boolean deleteFlag = false;

    public Friend(Member sender, Member receiver) {
        this.memberId1 = sender;
        this.memberId2 = receiver;
    }

    public void delete() {
        this.deleteFlag = true;
        this.updatedAt = LocalDateTime.now();  // 수동으로 updatedAt 업데이트
    }
}
