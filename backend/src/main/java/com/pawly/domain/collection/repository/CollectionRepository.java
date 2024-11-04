package com.pawly.domain.collection.repository;

import com.pawly.domain.collection.entity.Collection;
import com.pawly.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CollectionRepository extends JpaRepository<Collection, Long> {

    List<Collection> findByMemberId1(Member memberId);
}
