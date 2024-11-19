package com.pawly.domain.postbox.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostboxReadDto {
    private String name;
    private Double latitude;
    private Double longitude;
}
