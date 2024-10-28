package com.pawly.domain.postbox.dto;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.postbox.entity.Postbox;
import com.pawly.domain.postbox.enums.Statuse;
import com.pawly.domain.rollingPaper.entity.RollingPaper;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostboxCreateDto {
    private Long memberId;
    private Long rollingPaperId;
    private String title;
    private double latitude;
    private double longitude;
    private Statuse statuse;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Postbox toEntity(Member member, RollingPaper rollingPaper) {
        return Postbox.builder()
                .member(member)
                .rollingpaper(rollingPaper)
                .title(this.title)
                .latitude(this.latitude)
                .longitude(this.longitude)
                .statuse(this.statuse)
                .createdAt(this.createdAt)
                .updatedAt(this.updatedAt)
                .build();
    }
}