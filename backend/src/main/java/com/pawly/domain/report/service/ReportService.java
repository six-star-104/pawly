package com.pawly.domain.report.service;

import com.pawly.domain.report.dto.response.ReportResponseDTO;
import com.pawly.domain.report.entity.Report;
import com.pawly.domain.report.enums.Category;
import com.pawly.domain.report.repository.ReportRepository;
import com.pawly.global.dto.PageResponseDTO;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;

    public PageResponseDTO getReports(Category category, int pageNumber, int pageSize, String sortType, String sortBy) {

        Sort sort = sortType.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending()
            : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Page<Report> reports = reportRepository.findByCategory(category, pageable);

        List<ReportResponseDTO> reportResponseDTOS = reports.stream()
            .map(ReportResponseDTO::toDTO)
            .toList();

        return PageResponseDTO.builder()
            .content(reportResponseDTOS)
            .pageSize(pageSize)
            .pageNumber(pageNumber)
            .totalElements(reports.getTotalElements())
            .totalPage((long) Math.ceil((double) reports.getTotalElements() / pageSize))
            .build();
    }
}
