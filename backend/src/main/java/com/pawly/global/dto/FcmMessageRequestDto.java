package com.pawly.global.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FcmMessageRequestDto {

    private Long memberId;
    private String title;
    private String content;
}