package com.pawly.domain.postbox.entity;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.postbox.enums.Status;
import com.pawly.domain.rollingPaper.entity.RollingPaper;
import com.pawly.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Table(name = "postbox")
public class Postbox extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "postbox_id")
    private Long postboxId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rolling_paper_id")
    private RollingPaper rollingpaper;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Double latitude;
    
    @Column(nullable = false)
    private Double longitude;

    @Enumerated(EnumType.STRING)
    private Status status;
}
