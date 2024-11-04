package com.pawly.domain.letter.entity;

import com.pawly.domain.member.entity.Member;
import com.pawly.global.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Setter
@Getter
@ToString(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class Letter extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "letter_id")
    private Long letterId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender")
    private Member sender;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipient")
    private Member recipient;
    @Column(nullable = false)
    private String content;
    private String picture;
    private String reaction;
    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
