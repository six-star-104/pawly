package com.pawly.domain.easterEgg.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CompleteEasterEgg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long completeEasterEggId;

    private Long memberId;

    private Long easterEggId;

    private LocalDateTime createdAt;

    private Enum<Status> status;
}
