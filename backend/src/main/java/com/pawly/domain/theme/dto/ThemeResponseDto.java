package com.pawly.domain.theme.dto;

import com.pawly.domain.theme.entity.Theme;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public class ThemeResponseDto {

    private Long themeId;
    private String themeName;

    @Setter
    private String background;
    private String fontColor;
    private String borderColor;

    @Setter
    private boolean flag;

    public ThemeResponseDto(Theme theme) {
        this.themeId = theme.getThemeId();
        this.themeName = theme.getThemeName();
        this.fontColor = theme.getFontColor();
        this.borderColor = theme.getBorderColor();
    }
}
