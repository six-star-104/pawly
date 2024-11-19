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
    private int font;
    private int speechBubbleSize;
    private Long themeId;
}
