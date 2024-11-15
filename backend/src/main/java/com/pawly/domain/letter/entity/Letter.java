package com.pawly.domain.letter.entity;

import com.pawly.domain.member.entity.Member;
import com.pawly.global.entity.BaseEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Setter
@Getter
@ToString(callSuper = true)
@SuperBuilder
@NoArgsConstructor
@Table(name = "letter")
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
    private Integer reaction;

    @Column(name = "sender_delete_flag")
    private Boolean senderDeleteFlag = false;

    @Column(name = "recipient_delete_flag")
    private Boolean recipientDeleteFlag = false;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public void updatePicture(String fileUrl) {
        this.picture = fileUrl;
    }

    public void updateSenderDeleteFlag() {
        this.senderDeleteFlag = true;
    }

    public void updateRecipientDeleteFlag() {
        this.recipientDeleteFlag = true;
    }
}
