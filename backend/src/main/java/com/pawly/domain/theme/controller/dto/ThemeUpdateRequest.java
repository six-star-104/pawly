package com.pawly.domain.theme.controller.dto;

import com.pawly.domain.theme.dto.ThemeCreateDto;
import com.pawly.domain.theme.dto.ThemeUpdateDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ThemeUpdateRequest {
    @NotBlank
    private String themeName;

    @NotBlank
    private String backgroundColor;

    @NotBlank
    private String fontColor;

    @NotBlank
    private String borderColor;

    private String image;

    @NotNull
    private Boolean base;

    public ThemeUpdateDto toDto(String memberName, Long themeId) {
        return ThemeUpdateDto.builder()
                .memberName(memberName)
                .themeId(themeId)
                .themeName(this.themeName)
                .backgroundColor(this.backgroundColor)
                .fontColor(this.fontColor)
                .borderColor(this.borderColor)
                .image(this.image)
                .base(this.base)
                .build();
    }
}
