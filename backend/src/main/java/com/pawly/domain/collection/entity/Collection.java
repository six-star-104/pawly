package com.pawly.domain.collection.entity;

import com.pawly.domain.member.entity.Member;
import com.pawly.global.entity.BaseEntity;
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
public class Collection extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long collectionId;

    @ManyToOne
    @JoinColumn(name="memberId1")
    private Member memberId1;

    @ManyToOne
    @JoinColumn(name="memberId2")
    private Member memberId2;
}
