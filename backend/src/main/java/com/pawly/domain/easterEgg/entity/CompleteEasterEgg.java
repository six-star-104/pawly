package com.pawly.domain.easterEgg.entity;

import jakarta.persistence.*;
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
    @Column(name = "complete_easter_egg_id")
    private Long completeEasterEggId;

    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "easter_egg_id")
    private Long easterEggId;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    private Enum<Status> status;
}
