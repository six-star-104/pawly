package com.pawly.domain.report.dto.response;

import com.pawly.domain.report.entity.Report;
import com.pawly.domain.report.enums.Category;
import com.pawly.domain.report.enums.Status;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReportResponseDTO {

    private Long reportId;
    private Long memberId;
    private Category category;
    private Long detailId;
    private String content;
    private Status status;
    private LocalDateTime createdAt;

    public static ReportResponseDTO toDTO(Report report) {
        return ReportResponseDTO.builder()
            .reportId(report.getReportId())
            .memberId(report.getMember2().getMemberId())
            .category(report.getCategory())
            .detailId(report.getDetailId())
            .content(report.getContent())
            .status(report.getStatus())
            .createdAt(report.getCreatedAt())
            .build();
    }
}
