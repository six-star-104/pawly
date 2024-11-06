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
    private String memberName;
    private String title;
    private Double latitude;
    private Double longitude;

    public RollingPaper toEntity(Member member, int category){
        return  RollingPaper.builder()
                .member(member)
                .deleteFlag(false)
                .category(category)
                .title(title)
                .createdAt(LocalDateTime.now())
                .build();
    }
}
