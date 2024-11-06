package com.pawly.domain.postIt.repository;

import com.pawly.domain.postIt.entity.PostIt;
import com.pawly.domain.rollingPaper.entity.RollingPaper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PostItRepository extends JpaRepository<PostIt, Long> {
        @Query("SELECT p FROM PostIt p " +
                "WHERE p.rollingPaper = :rollingPaper " +
                "AND p.status = 'NOT_DELETE'")
        Page<PostIt>  findByRollingPaper(RollingPaper rollingPaper, Pageable pageable);
}
