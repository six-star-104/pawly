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
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static PostItReadDto of(Member member, PostIt postIt) {
        return PostItReadDto.builder()
                .postItId(postIt.getPostId())
                .memberId(member.getMemberId())
                .memberNickname(member.getNickname())
                .content(postIt.getContent())
                .status(postIt.getStatus())
                .createdAt(postIt.getCreatedAt())
                .updatedAt(postIt.getUpdatedAt())
                .build();
    }

//    public static PostItReadDto of(Long postItId, Long memberId, String memberNickname, String content, Status status) {
//        return PostItReadDto.builder()
//                .postItId(postItId)
//                .memberId(memberId)
//                .memberNickname(memberNickname)
//                .content(content)
//                .status(status)
//                .build();
//    }
}
