package com.pawly.domain.postIt.dto;

import com.pawly.domain.report.entity.Report;
import com.pawly.domain.report.enums.Category;
import com.pawly.domain.report.enums.Status;
import com.pawly.domain.member.entity.Member;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostReportCreateDto {
    private String memberName;
    private Long postId;
    private String content;

    public Report toEntity(Member member, Member member2, Long postId){
        return Report.builder()
                .member(member)
                .member2(member2)
                .category(Category.ROLLING_PAPER)
                .detailId(postId)
                .content(this.content)
                .status(Status.STANDBY)
                .createdAt(LocalDateTime.now())
                .build();
    }
}
