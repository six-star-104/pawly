package com.pawly.domain.report.service;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.missionStatus.entity.MissionStatus;
import com.pawly.domain.missionStatus.repository.MissionStatusRepository;
import com.pawly.domain.report.dto.response.ReportResponseDTO;
import com.pawly.domain.report.entity.Report;
import com.pawly.domain.report.enums.Category;
import com.pawly.domain.report.enums.Status;
import com.pawly.domain.report.repository.ReportRepository;
import com.pawly.global.dto.PageResponseDTO;
import java.time.LocalDateTime;
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
    private final MissionStatusRepository missionStatusRepository;

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

    public void confirmReport(Long reportId, Status confirmStatus) {

        Report report = reportRepository.findByReportId(reportId);
        Member member = report.getMember();

        if (confirmStatus.equals(Status.COMPLETE)) {
            report.setStatus(Status.COMPLETE);
            MissionStatus missionStatus = missionStatusRepository.findByMemberId(member.getMemberId());

            missionStatus.reportsCountPlus();

            if (missionStatus.getReportsCount() >= 5) {
                member.deleteMember();
            } else if (missionStatus.getReportsCount() >= 3) {
                member.stopMember();
                member.setSuspendedUntil(LocalDateTime.now().plusDays(3)); // 현재 시점에서 3일 뒤를 정지 해제 시간으로 설정
            }
        } else if (confirmStatus.equals(Status.DENIED)) {
            report.setStatus(Status.DENIED);
        }
    }
}
