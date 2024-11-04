package com.pawly.domain.Report.Entity;

import com.pawly.domain.Report.enums.Category;
import com.pawly.domain.Report.enums.Status;
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
    private Long ReportId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Enumerated(EnumType.STRING)
    private Category category;

    private Long detailId;
    private String content;

    @Enumerated(EnumType.STRING)
    private Status status;
}
