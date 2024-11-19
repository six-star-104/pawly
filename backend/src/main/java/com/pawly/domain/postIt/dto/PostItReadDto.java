package com.pawly.domain.postIt.dto;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.postIt.entity.PostIt;
import com.pawly.domain.postIt.enums.Status;
import com.pawly.domain.theme.entity.Theme;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostItReadDto {
    private Long postItId;
    private Long memberId;
    private String memberNickname;
    private String content;
    private Status status;
    private Long themeId;
    private String backgroundColor;
    private int font;
    private String fontColor;
    private String borderColor;
    private String image;
    private int speechBubbleSize;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static PostItReadDto of(Member member, PostIt postIt, Theme theme) {
        return PostItReadDto.builder()
                .postItId(postIt.getPostId())
                .memberId(member.getMemberId())
                .memberNickname(member.getNickname())
                .content(postIt.getContent())
                .themeId(theme.getThemeId())
                .backgroundColor(theme.getBackgroundColor())
                .font(postIt.getFont())
                .fontColor(theme.getFontColor())
                .borderColor(theme.getBorderColor())
                .image(theme.getImage())
                .speechBubbleSize(postIt.getSpeechBubbleSize())
                .status(postIt.getStatus())
                .createdAt(postIt.getCreatedAt())
                .updatedAt(postIt.getUpdatedAt())
                .build();
    }
}
