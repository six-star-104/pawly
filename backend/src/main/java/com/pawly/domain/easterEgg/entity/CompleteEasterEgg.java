package com.pawly.domain.easterEgg.entity;

import com.pawly.domain.easterEgg.dto.CompleteEasterEggDto;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "complete_easter_egg")
public class CompleteEasterEgg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "complete_easter_egg_id")
    private Long completeEasterEggId;

    @Column(name = "member_id")
    private Long memberId;

    @ManyToOne
    @JoinColumn(name = "easter_egg_id")
    private EasterEgg easterEgg;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Enumerated(EnumType.STRING)
    private Status status;

    public void updateStatus() {
        this.status = Status.COMPLETE;
        this.completedAt = LocalDateTime.now();
    }

    public void achievedStatus() {
        this.status = Status.ACHIEVED;
    }

    public CompleteEasterEgg(CompleteEasterEggDto dto) {
        this.memberId = dto.getMemberId();
        this.easterEgg = dto.getEasterEgg();
        this.status = dto.getStatus();
    }
}
