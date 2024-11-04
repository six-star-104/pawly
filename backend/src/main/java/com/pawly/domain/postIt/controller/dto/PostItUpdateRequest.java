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

    public PostItUpdateDto toDto(Long memberId, Long postItId) {
        return PostItUpdateDto.builder()
                .memberId(memberId)
                .postItId(postItId)
                .content(this.content)
                .build();
    }
}
