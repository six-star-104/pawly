package com.pawly.domain.theme.controller.dto;

import com.pawly.domain.theme.dto.ThemeCreateDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ThemeCreateRequest {
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

    public ThemeCreateDto toDto(String memberName) {
        return ThemeCreateDto.builder()
                .memberName(memberName)
                .themeName(this.themeName)
                .backgroundColor(this.backgroundColor)
                .fontColor(this.fontColor)
                .borderColor(this.borderColor)
                .image(this.image)
                .base(this.base)
                .build();
    }
}

