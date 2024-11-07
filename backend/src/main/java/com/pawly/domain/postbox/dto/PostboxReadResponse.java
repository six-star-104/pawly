package com.pawly.domain.postbox.dto;

import com.pawly.domain.postbox.entity.Postbox;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostboxReadResponse {
    private Long postboxId;
    private Long memberId;
    private String title;
    private double latitude;
    private double longitude;

    public static PostboxReadResponse from(Postbox postbox) {
        return PostboxReadResponse.builder()
                .postboxId(postbox.getPostboxId())
                .memberId(postbox.getMember().getMemberId())
                .title(postbox.getTitle())
                .latitude(postbox.getLatitude())
                .longitude(postbox.getLongitude())
                .build();
    }
}
