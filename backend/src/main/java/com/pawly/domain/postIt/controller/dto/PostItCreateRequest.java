package com.pawly.domain.postIt.controller.dto;

import com.pawly.domain.postIt.dto.PostItCreateDto;
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

    @NotNull
    private String content;

    @NotNull
    private int backgroundColor;

    @NotNull
    private int fontColor;

    @NotNull
    private int borderColor;

    @NotNull
    private String image;

    @NotNull
    private int speechBubbleSize;

    public PostItCreateDto toDto(String name){
        return PostItCreateDto.builder()
                .memberName(name)
                .rollingPaperId(this.rollingPaperId)
                .content(this.content)
                .backgroundColor(this.backgroundColor)
                .fontColor(this.fontColor)
                .borderColor(this.borderColor)
                .image(this.image)
                .speechBubbleSize(this.speechBubbleSize)
                .build();
    }
}
