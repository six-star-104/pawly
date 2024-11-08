package com.pawly.domain.theme.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ThemeUpdateDto {
    private String memberName;
    private Long themeId;
    private String themeName;
    private String backgroundColor;
    private String fontColor;
    private String borderColor;
    private String image;
    private Boolean base;
}
