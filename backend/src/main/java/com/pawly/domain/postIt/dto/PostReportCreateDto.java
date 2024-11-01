package com.pawly.domain.postIt.dto;

import com.pawly.domain.Report.Entity.Report;
import com.pawly.domain.Report.enums.Category;
import com.pawly.domain.Report.enums.Status;
import com.pawly.domain.member.entity.Member;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostReportCreateDto {
    private Long memberId;
    private Long postId;
    private String content;

    public Report toEntity(Member member, Long postId){
        return Report.builder()
                .member(member)
                .category(Category.ROLLING_PAPER)
                .detailId(postId)
                .content(this.content)
                .status(Status.STANDBY)
                .build();
    }
}
