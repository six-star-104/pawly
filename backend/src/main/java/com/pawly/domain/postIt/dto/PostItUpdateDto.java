package com.pawly.domain.postIt.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostItUpdateDto {
    private Long memberId;
    private Long postItId;
    private String content;
}
