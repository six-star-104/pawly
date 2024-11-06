package com.pawly.domain.rollingPaper.controller.dto;

import com.pawly.domain.rollingPaper.dto.RollingPaperCreateDto;
import jakarta.validation.constraints.NotBlank;
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
    @NotBlank
    private String title;

    @NotNull
    private Double latitude;

    @NotNull
    private Double longitude;

    public RollingPaperCreateDto toDto(String memberName){
        return RollingPaperCreateDto.builder()
                .memberName(memberName)
                .title(title)
                .latitude(latitude)
                .longitude(longitude)
                .build();
    }
}
