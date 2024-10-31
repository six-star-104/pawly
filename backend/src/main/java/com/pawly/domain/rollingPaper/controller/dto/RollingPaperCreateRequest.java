package com.pawly.domain.rollingPaper.controller.dto;

import com.pawly.domain.rollingPaper.dto.RollingPaperCreateDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RollingPaperCreateRequest {
    @NotNull
    private String title;

    @NotNull
    private Double latitude;

    @NotNull
    private Double longitude;

    public RollingPaperCreateDto toDto(Long memberId){
        return RollingPaperCreateDto.builder()
                .memberId(memberId)
                .title(title)
                .latitude(latitude)
                .longitude(longitude)
                .build();
    }
}
