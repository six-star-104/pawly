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
    private Long rollingPaperId;
    private Long memberId;
    private String postboxOwner;
    private String title;
    private double latitude;
    private double longitude;
    private String assetUrl;

    public static PostboxReadResponseDto from(Postbox postbox, String assetUrl) {
        return PostboxReadResponseDto.builder()
                .postboxId(postbox.getPostboxId())
                .rollingPaperId(postbox.getRollingpaper().getRollingPaperId())
                .memberId(postbox.getMember().getMemberId())
                .postboxOwner(postbox.getMember().getNickname())
                .title(postbox.getTitle())
                .latitude(postbox.getLatitude())
                .longitude(postbox.getLongitude())
                .assetUrl(assetUrl)
                .build();
    }
}
