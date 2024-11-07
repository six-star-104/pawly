package com.pawly.domain.postIt.dto;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.postIt.entity.PostIt;
import com.pawly.domain.postIt.enums.Status;
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
    private int backgroundColor;
    private int fontColor;
    private int borderColor;
    private String image;
    private int speechBubbleSize;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static PostItReadDto of(Member member, PostIt postIt) {
        return PostItReadDto.builder()
                .postItId(postIt.getPostId())
                .memberId(member.getMemberId())
                .memberNickname(member.getNickname())
                .content(postIt.getContent())
                .backgroundColor(postIt.getBackgroundColor())
                .fontColor(postIt.getFontColor())
                .borderColor(postIt.getBorderColor())
                .image(postIt.getImage())
                .speechBubbleSize(postIt.getSpeechBubbleSize())
                .status(postIt.getStatus())
                .createdAt(postIt.getCreatedAt())
                .updatedAt(postIt.getUpdatedAt())
                .build();
    }
}
