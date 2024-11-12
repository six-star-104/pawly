package com.pawly.domain.report.controller;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.entity.Role;
import com.pawly.domain.member.service.MemberService;
import com.pawly.domain.report.enums.Category;
import com.pawly.domain.report.enums.Status;
import com.pawly.domain.report.service.ReportService;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class ReportController {

    private final MemberService memberService;
    private final ReportService reportService;

    @GetMapping("/{category}")
    public ApiResponse<?> getReport(Authentication authentication, @PathVariable("category") String category,
                                    @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber,
                                    @RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
                                    @RequestParam(name = "sortType", defaultValue = "desc") String sortType,
                                    @RequestParam(name = "sortBy", required = false, defaultValue = "createdAt") String sortBy) throws Exception {

        Member member = memberService.findByEmail(authentication.getName());

        if (member == null) {
            return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
        }

//        if (!Objects.requireNonNull(member).getRole().equals(Role.ADMIN)) {
//            return ApiResponse.createError(ErrorCode.NOT_ADMIN_FAILED);
//        }

        return ApiResponse.createSuccess(reportService.getReports(Category.valueOf(category), pageNumber, pageSize, sortType, sortBy),"성공");
    }

    @PatchMapping("/{reportId}")
    public ApiResponse<?> confirmReport(Authentication authentication, @PathVariable("reportId") Long reportId,
                                                                        @RequestParam(name = "confirmType") String confirmType) throws Exception {
        Member member = memberService.findByEmail(authentication.getName());

        if (member == null) {
            return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
        }

//        if (!Objects.requireNonNull(member).getRole().equals(Role.ADMIN)) {
//            return ApiResponse.createError(ErrorCode.NOT_ADMIN_FAILED);
//        }
        reportService.confirmReport(reportId, Status.valueOf(confirmType));

        return ApiResponse.createSuccessWithNoContent("신고 내용 반영 성공");
    }
}
