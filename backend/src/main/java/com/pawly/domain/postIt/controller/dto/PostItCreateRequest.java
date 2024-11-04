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

    public PostItCreateDto toDto(Long memberId){
        return PostItCreateDto.builder()
                .memberId(memberId)
                .rollingPaperId(this.rollingPaperId)
                .content(this.content)
                .build();
    }
}
