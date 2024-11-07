package com.pawly.domain.postIt.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostItUpdateDto {
    private String memberName;
    private Long postItId;
    private String content;
    private int backgroundColor;
    private int fontColor;
    private int borderColor;
    private String image;
    private int speechBubbleSize;
}
