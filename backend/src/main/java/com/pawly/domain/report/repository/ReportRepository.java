package com.pawly.domain.report.repository;

import com.pawly.domain.report.entity.Report;
import com.pawly.domain.report.enums.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {

    Page<Report> findByCategory(Category category, Pageable pageable);
}
