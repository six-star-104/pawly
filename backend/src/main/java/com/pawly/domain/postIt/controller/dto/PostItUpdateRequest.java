package com.pawly.domain.postIt.controller.dto;

import com.pawly.domain.postIt.dto.PostItUpdateDto;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostItUpdateRequest {
    @NotNull
    private String content;

    @NotNull
    private Integer backgroundColor;

    @NotNull
    private Integer fontColor;

    @NotNull
    private Integer borderColor;

    @NotNull
    private String image;

    @NotNull
    private int speechBubbleSize;

    public PostItUpdateDto toDto(String memberName, Long postItId) {
        return PostItUpdateDto.builder()
                .memberName(memberName)
                .postItId(postItId)
                .content(this.content)
                .backgroundColor(this.backgroundColor)
                .fontColor(this.fontColor)
                .borderColor(this.borderColor)
                .image(this.image)
                .speechBubbleSize(this.speechBubbleSize)
                .build();
    }
}
