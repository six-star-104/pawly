package com.pawly.domain.postbox.controller.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostboxReadRequest {
    private Double latitude;
    private Double longitude;
}
