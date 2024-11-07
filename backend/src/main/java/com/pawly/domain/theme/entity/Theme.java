package com.pawly.domain.theme.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
    private boolean base;
}
