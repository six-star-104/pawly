package com.pawly.domain.postIt.dto;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.postIt.entity.PostIt;
import com.pawly.domain.postIt.enums.Status;
import com.pawly.domain.rollingPaper.entity.RollingPaper;
import com.pawly.domain.theme.entity.Theme;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostItCreateDto {
    private String memberName;
    private Long rollingPaperId;
    private String content;
    private int speechBubbleSize;
    private int font;
    private Long themeId;

    public PostIt toEntity(Member member, RollingPaper rollingPaper, Theme theme) {
        return PostIt.builder()
                .member(member)
                .rollingPaper(rollingPaper)
                .content(this.content)
                .status(Status.NOT_DELETE)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .font(this.font)
                .theme(theme)
                .speechBubbleSize(this.speechBubbleSize)
                .build();
    }
}
