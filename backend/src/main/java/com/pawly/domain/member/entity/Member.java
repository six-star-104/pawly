package com.pawly.domain.member.entity;

import com.pawly.global.entity.BaseEntity;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Setter
@Getter
@ToString(callSuper = true)
@SuperBuilder
@NoArgsConstructor
@Table(name = "member")
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;
    private String name;
    private String email;
    private String nickname;
    private LocalDate birth;
    private String assets;
    private String provider;
    @Column(name = "provider_id")
    private String providerId;
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Role role = Role.USER;
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.ACTIVATED;
    @Column(name = "fcm_token")
    private String fcmToken;
    private LocalDateTime suspendedUntil;

    public void updateOAuthInfo(String provider, String providerId) {
        this.provider = provider;
        this.providerId = providerId;
    }

    public void deleteMember() {
        this.status = Status.DEACTIVATED;
    }

    public void stopMember() {
        this.status = Status.SUSPENDED;
    }
    // 정지 해제 메서드
    public void resumeMember() {
        this.suspendedUntil = null;
        this.status = Status.ACTIVATED; // 예시로 ACTIVE 상태로 복구
    }
}
