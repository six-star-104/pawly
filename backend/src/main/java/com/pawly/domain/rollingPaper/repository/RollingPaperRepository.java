package com.pawly.domain.rollingPaper.repository;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.rollingPaper.entity.RollingPaper;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RollingPaperRepository extends JpaRepository<RollingPaper, Long> {
    Slice<RollingPaper> findByMember(Member Member, Pageable pageable);
}
