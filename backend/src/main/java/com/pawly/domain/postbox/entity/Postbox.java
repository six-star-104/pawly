package com.pawly.domain.postbox.entity;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.postbox.enums.Statuse;
import com.pawly.domain.rollingPaper.entity.RollingPaper;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
//@EntityListeners(AuditingEntityListener.class) // 이게
public class Postbox {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rolling_paper_id")
    private RollingPaper rollingpaper;

    private String title;
    private double latitude;
    private double longitude;
    private Statuse statuse;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
