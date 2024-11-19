package com.pawly.domain.rollingPaper.repository;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.rollingPaper.entity.RollingPaper;
import com.pawly.domain.rollingPaper.enums.Status;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;
import java.util.Optional;

public interface RollingPaperRepository extends JpaRepository<RollingPaper, Long> {

    @Query("SELECT r FROM RollingPaper r " +
            "WHERE r.member =:member " +
            "AND (r.status = 'CLOSE' OR r.status = 'NOT_DELETE') ")
    Slice<RollingPaper> findByMember(Member member, Pageable pageable);

    @Query ("SELECT r FROM RollingPaper r " +
            "WHERE r.member =:member " +
            "AND r.category = 1 " +
            "AND (r.status = 'CLOSE' OR r.status = 'NOT_DELETE') ")
    List<RollingPaper> findByMember(Member member);

    @Query("SELECT r FROM RollingPaper r " +
            "WHERE r.rollingPaperId =:rollingPaperId " +
            "AND (r.status = 'CLOSE' OR r.status = 'NOT_DELETE') ")
    Optional<RollingPaper> findByRollingPaperId(Long rollingPaperId);
}
