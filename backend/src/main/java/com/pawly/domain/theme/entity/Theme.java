package com.pawly.domain.theme.entity;

import com.pawly.domain.theme.dto.ThemeUpdateDto;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Theme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "theme_id")
    private Long themeId;

    @Column(name = "theme_name")
    private String themeName;

    @Column(name = "background_color")
    private String backgroundColor;

    @Column(name = "font_color")
    private String fontColor;

    @Column(name = "border_color")
    private String borderColor;

    private String image;
    private Boolean base;

    private Boolean deleteFlag = false;

    public void updateTheme(ThemeUpdateDto dto) {
        this.themeName = dto.getThemeName();
        this.backgroundColor = dto.getBackgroundColor();
        this.fontColor = dto.getFontColor();
        this.borderColor = dto.getBorderColor();
        this.image = dto.getImage();
        this.base = dto.getBase();
    }

    public void deleteTheme() {this.deleteFlag = true;}
}
