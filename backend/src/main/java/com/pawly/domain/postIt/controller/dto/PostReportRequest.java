package com.pawly.domain.postIt.controller.dto;

import com.pawly.domain.postIt.dto.PostReportCreateDto;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostReportRequest {
    @NotNull
    private String content;

    public PostReportCreateDto toDto(Long memberId, Long postId){
        return PostReportCreateDto.builder()
                .memberId(memberId)
                .postId(postId)
                .content(this.content)
                .build();
    }
}

