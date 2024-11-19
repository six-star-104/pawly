package com.pawly.domain.postIt.controller.dto;

import com.pawly.domain.postIt.dto.PostItCreateDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostItCreateRequest {
    @NotNull
    private Long rollingPaperId;

    @NotBlank
    private String content;

    @NotNull
    private Integer font;

    @NotNull
    private Integer speechBubbleSize;

    @NotNull
    private Long themeId;

    public PostItCreateDto toDto(String name){
        return PostItCreateDto.builder()
                .memberName(name)
                .rollingPaperId(this.rollingPaperId)
                .content(this.content)
                .font(this.font)
                .themeId(themeId)
                .speechBubbleSize(this.speechBubbleSize)
                .build();
    }
}
