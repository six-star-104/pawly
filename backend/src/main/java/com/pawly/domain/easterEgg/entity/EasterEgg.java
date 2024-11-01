package com.pawly.domain.easterEgg.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EasterEgg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long easterEggId;

    private String content;

    private String reward;
}
