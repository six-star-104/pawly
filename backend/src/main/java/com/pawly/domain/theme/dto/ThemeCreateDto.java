package com.pawly.domain.theme.dto;

import com.pawly.domain.theme.entity.Theme;
import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ThemeCreateDto {
    private String memberName;
    private String themeName;
    private String backgroundColor;
    private String fontColor;
    private String borderColor;
    private String image;
    private Boolean base;

    public Theme toEntity() {
        return Theme.builder()
                .themeName(this.themeName)
                .backgroundColor(this.backgroundColor)
                .fontColor(this.fontColor)
                .borderColor(this.borderColor)
                .image(this.image)
                .base(this.base)
                .deleteFlag(false)
                .build();
    }
}