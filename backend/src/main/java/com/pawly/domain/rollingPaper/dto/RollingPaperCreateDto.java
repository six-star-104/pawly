package com.pawly.domain.rollingPaper.dto;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.rollingPaper.entity.RollingPaper;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RollingPaperCreateDto {
    private Long memberId;
    private String title;
    private Double latitude;
    private Double longitude;

    public RollingPaper toEntity(Member member){
        return  RollingPaper.builder()
                .member(member)
                .deleteFlag(false)
                .category(1)
                .title(title)
                .createdAt(LocalDateTime.now())
                .build();
    }
}
