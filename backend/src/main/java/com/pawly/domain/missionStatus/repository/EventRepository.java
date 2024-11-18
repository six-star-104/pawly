package com.pawly.domain.missionStatus.repository;

import com.pawly.domain.missionStatus.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {

    Optional<Event> findByMemberIdAndMemberId2AndType(Long member, Long member2, int type);

    int countByMemberIdAndType(Long member, int type);
}
