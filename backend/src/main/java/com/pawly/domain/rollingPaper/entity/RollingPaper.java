package com.pawly.domain.rollingPaper.entity;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.rollingPaper.enums.Status;
import com.pawly.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Table(name = "rolling_paper")
public class RollingPaper extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rolling_paper_id")
    private Long rollingPaperId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Status status;

    private int category;

    @Column(nullable = false)
    private String title;

    public void delete(){
        this.status = Status.DELETE;
    }

    public void close(){ this.status = Status.CLOSE;}
}
