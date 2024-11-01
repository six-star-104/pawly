package com.pawly.domain.postIt.repository;

import com.pawly.domain.postIt.entity.PostIt;
import com.pawly.domain.rollingPaper.entity.RollingPaper;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostItRepository extends JpaRepository<PostIt, Long> {
    Slice<PostIt>  findByRollingPaper(RollingPaper RollingPaper, Pageable pageable);
}
