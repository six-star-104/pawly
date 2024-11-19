package com.pawly.domain.easterEgg.entity;

import com.pawly.domain.theme.entity.Theme;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "easter_egg")
public class EasterEgg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "easter_egg_id")
    private Long easterEggId;

    private String content;

    @ManyToOne
    @JoinColumn(name = "theme_id")
    private Theme theme;

    @Column(name = "secret_flag")
    private boolean secretFlag;
}
