package com.pawly.domain.report.entity;

import com.pawly.domain.report.enums.Category;
import com.pawly.domain.report.enums.Status;
import com.pawly.domain.member.entity.Member;
import com.pawly.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Table(name = "report")
public class Report extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Long reportId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id2")
    private Member member2;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(name = "detail_id")
    private Long detailId;
    private String content;

    @Enumerated(EnumType.STRING)
    private Status status;
}
