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
    private Integer font;

    @NotNull
    private Integer speechBubbleSize;

    @NotNull
    private Long themeId;

    public PostItUpdateDto toDto(String memberName, Long postItId) {
        return PostItUpdateDto.builder()
                .memberName(memberName)
                .postItId(postItId)
                .content(this.content)
                .font(this.font)
                .themeId(themeId)
                .speechBubbleSize(this.speechBubbleSize)
                .build();
    }
}
