package com.pawly.domain.rollingPaper.repository;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.rollingPaper.entity.RollingPaper;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RollingPaperRepository extends JpaRepository<RollingPaper, Long> {
    @Query("SELECT r FROM RollingPaper r " +
            "WHERE r.member =:member " +
            "AND r.deleteFlag = false ")
    Slice<RollingPaper> findByMember(Member member, Pageable pageable);

    @Query ("SELECT r FROM RollingPaper r " +
            "WHERE r.member =:member " +
            "AND r.category = 1" +
            "AND r.deleteFlag = false ")
    List<RollingPaper> findByMember(Member member);
}
