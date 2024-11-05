package com.pawly.domain.postIt.dto;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.postIt.entity.PostIt;
import com.pawly.domain.postIt.enums.Status;
import com.pawly.domain.rollingPaper.entity.RollingPaper;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostItCreateDto {
    private Long memberId;
    private Long rollingPaperId;
    private String content;

    public PostIt toEntity(Member member, RollingPaper rollingPaper) {
        return PostIt.builder()
                .member(member)
                .rollingPaper(rollingPaper)
                .content(this.content)
                .status(Status.NOT_DELETE)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }
}
