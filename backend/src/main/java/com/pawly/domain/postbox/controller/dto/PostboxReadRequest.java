package com.pawly.domain.postbox.controller.dto;

import com.pawly.domain.postbox.dto.PostboxReadDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostboxReadRequest {
    private Double latitude;
    private Double longitude;

    public PostboxReadDto toDto(String name){
        return PostboxReadDto.builder()
                .name(name)
                .latitude(this.latitude)
                .longitude(this.longitude)
                .build();
    }
}
