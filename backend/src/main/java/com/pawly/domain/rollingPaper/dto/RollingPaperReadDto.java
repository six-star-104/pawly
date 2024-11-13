package com.pawly.domain.rollingPaper.dto;

import com.pawly.domain.rollingPaper.entity.RollingPaper;
import com.pawly.domain.rollingPaper.enums.Status;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class RollingPaperReadDto {
    private Long rollingPaperId;
    private String title;
    private Status status;
    private int category;
    private LocalDateTime createAt;

    public static RollingPaperReadDto of(RollingPaper rollingPaper) {
        return RollingPaperReadDto.builder()
                .rollingPaperId(rollingPaper.getRollingPaperId())
                .title(rollingPaper.getTitle())
                .status(rollingPaper.getStatus())
                .category(rollingPaper.getCategory())
                .createAt(rollingPaper.getCreatedAt())
                .build();
    }
}
