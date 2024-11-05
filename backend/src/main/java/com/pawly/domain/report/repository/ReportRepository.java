package com.pawly.domain.report.repository;

import com.pawly.domain.report.Entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {
}
