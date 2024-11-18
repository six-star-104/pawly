package com.pawly.domain.missionStatus.entity;

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
@Table(name = "event")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private Long eventId;

    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "member_id2")
    private Long memberId2;

    private Integer type;

    public Event(Long memberId, Long memberId2, int i) {
        this.memberId = memberId;
        this.memberId2 = memberId2;
        this.type = i;
    }
}
