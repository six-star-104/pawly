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

    private String nickname;
    private String assets;

    public static SearchResponseDto info(Member member) {
        return SearchResponseDto.builder()
                .nickname(member.getNickname())
                .assets(member.getAssets())
                .build();
    }
}
