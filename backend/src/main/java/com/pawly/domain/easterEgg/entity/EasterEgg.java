package com.pawly.domain.easterEgg.entity;

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

    private String reward;
}
