package com.pawly.domain.collection.repository;

import com.pawly.domain.collection.entity.Collection;
import com.pawly.domain.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CollectionRepository extends JpaRepository<Collection, Long> {

    Page<Collection> findByMemberId1(Member memberId, Pageable pageable);
    Optional<Collection> findByMemberId1AndMemberId2(Member memberId, Member friendId);
}
