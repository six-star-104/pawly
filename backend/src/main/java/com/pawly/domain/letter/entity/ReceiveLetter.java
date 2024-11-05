package com.pawly.domain.letter.entity;

import com.pawly.domain.member.entity.Member;
import com.pawly.global.entity.BaseEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import lombok.Builder;
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
@Table(name = "receive_letter")
public class ReceiveLetter extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "receive_letter_id")
    private Long receiveLetterId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "letter_id")
    private Letter letter;
    @Column(name = "delete_flag", nullable = false)
    @Builder.Default
    private Boolean deleteFlag = false;
    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public void deleteLetter(ReceiveLetter receiveLetter) {
        receiveLetter.setDeleteFlag(true);
    }
}
