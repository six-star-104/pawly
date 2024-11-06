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
@Table(name = "mission_status")
public class MissionStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mission_status_id")
    private Long missionStatusId;

    @Column(name = "member_id")
    private Long memberId;

    private Long collection = 0L;

    @Column(name = "receive_letter")
    private Long receiveLetter = 0L;

    @Column(name = "send_letter")
    private Long sendLetter = 0L;

    @Column(name = "rolling_paper")
    private Long rollingPaper = 0L;

    public MissionStatus(Long memberId) {
        this.memberId = memberId;
    }
}