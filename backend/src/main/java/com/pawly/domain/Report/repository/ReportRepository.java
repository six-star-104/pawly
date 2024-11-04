package com.pawly.domain.Report.repository;

import com.pawly.domain.Report.Entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {
}
