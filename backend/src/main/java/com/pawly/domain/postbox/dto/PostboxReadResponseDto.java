package com.pawly.domain.postbox.dto;

import com.pawly.domain.postbox.entity.Postbox;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostboxReadResponseDto {
    private Long postboxId;
    private Long memberId;
    private String postboxOwner;
    private String title;
    private double latitude;
    private double longitude;

    public static PostboxReadResponseDto from(Postbox postbox) {
        return PostboxReadResponseDto.builder()
                .postboxId(postbox.getPostboxId())
                .memberId(postbox.getMember().getMemberId())
                .postboxOwner(postbox.getMember().getNickname())
                .title(postbox.getTitle())
                .latitude(postbox.getLatitude())
                .longitude(postbox.getLongitude())
                .build();
    }
}
