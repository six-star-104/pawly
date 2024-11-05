package com.pawly.domain.postIt.entity;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.postIt.enums.Status;
import com.pawly.domain.rollingPaper.entity.RollingPaper;
import com.pawly.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Table(name = "post_it")
public class PostIt extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long postId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rolling_paper_id")
    private RollingPaper rollingPaper;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String content;

    @Enumerated(EnumType.STRING)
    private Status status;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public void updatePostIt(String content) {
        this.content = content;
        this.updatedAt = LocalDateTime.now();
    }

    public void deletePostIt() {
        this.status = Status.DELETE;
    }
}
