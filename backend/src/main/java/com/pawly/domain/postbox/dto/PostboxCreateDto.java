package com.pawly.domain.postbox.dto;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.postbox.entity.Postbox;
import com.pawly.domain.postbox.enums.Status;
import com.pawly.domain.rollingPaper.entity.RollingPaper;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostboxCreateDto {
    private Member member;
    private RollingPaper rollingPaper;
    private String title;
    private Double latitude;
    private Double longitude;
    private Status statuse;
    private LocalDateTime createdAt;

    public Postbox toEntity() {
        return Postbox.builder()
                .member(this.member)
                .rollingpaper(this.rollingPaper)
                .title(this.title)
                .latitude(this.latitude)
                .longitude(this.longitude)
                .status(this.statuse)
                .createdAt(this.createdAt)
                .build();
    }
}