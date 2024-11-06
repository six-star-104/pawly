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

    public PostReportCreateDto toDto(String memberName, Long postId){
        return PostReportCreateDto.builder()
                .memberName(memberName)
                .postId(postId)
                .content(this.content)
                .build();
    }
}

