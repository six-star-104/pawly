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

    @LastModifiedDate
    private LocalDateTime updatedAt;

    private Boolean deleteFlag = false;

    public void delete() {
        this.deleteFlag = true;
        this.updatedAt = LocalDateTime.now();  // 수동으로 updatedAt 업데이트
    }
}
