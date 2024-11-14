package com.pawly.domain.member.dto.response;

import com.pawly.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchResponseDto {

    private Long memberId;
    private String name;
    private String nickname;
    private String assets;
    private int status;

    public static SearchResponseDto info(Member member, int status) {
        return SearchResponseDto.builder()
            .name(member.getName())
            .memberId(member.getMemberId())
            .nickname(member.getNickname())
            .assets(member.getAssets())
            .status(status)
            .build();
    }
}
