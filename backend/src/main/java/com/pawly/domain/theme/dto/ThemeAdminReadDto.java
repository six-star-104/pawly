package com.pawly.domain.theme.dto;

import com.pawly.domain.theme.entity.Theme;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ThemeAdminReadDto {

    private Long themeId;
    private String themeName;
    private String backgroundColor;
    private String fontColor;
    private String image;
    private String borderColor;
    private boolean base;
    private boolean deleteFlag;

    public static ThemeAdminReadDto of(Theme theme) {
        return ThemeAdminReadDto.builder()
                .themeId(theme.getThemeId())
                .themeName(theme.getThemeName())
                .backgroundColor(theme.getBackgroundColor())
                .fontColor(theme.getFontColor())
                .image(theme.getImage())
                .borderColor(theme.getBorderColor())
                .base(theme.getBase())
                .deleteFlag(theme.getDeleteFlag())
                .build();
    }
}
