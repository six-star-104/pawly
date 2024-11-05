package com.pawly.domain.rollingPaper.controller;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.domain.member.service.MemberService;
import com.pawly.domain.member.service.MemberServiceImpl;
import com.pawly.domain.rollingPaper.controller.dto.RollingPaperCreateRequest;
import com.pawly.domain.rollingPaper.service.RollingPaperService;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/rollingpaper")
@RequiredArgsConstructor
public class RollingPaperController {
    private final RollingPaperService rollingPaperService;
    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<?> createRollingPaper(Authentication authentication, @Valid @RequestBody RollingPaperCreateRequest rollingPaperCreateRequest) throws Exception {

        Member member = memberService.findByEmail(authentication.getName());

        ApiResponse<?> response = rollingPaperService.createRollingPaper(rollingPaperCreateRequest.toDto(member.getMemberId()));
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<?> readAllRollingPaper(Authentication authentication, @PageableDefault(size = 10) Pageable pageable) throws Exception {

        Member member = memberService.findByEmail(authentication.getName());

        ApiResponse<?> response = rollingPaperService.readAllRollingPaper(member.getMemberId(), pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{rollingPaperId}")
    public ResponseEntity<?> readRollingPaper(Authentication authentication,
                                                @PathVariable Long rollingPaperId,
                                              @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber,
                                              @RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
                                              @RequestParam(name = "sortType", defaultValue = "desc") String sortType,
                                              @RequestParam(name = "sortBy", required = false, defaultValue = "createdAt") String sortBy) throws Exception {

        Member member = memberService.findByEmail(authentication.getName());

        ApiResponse<?> response = rollingPaperService.readRollingPaper(member.getMemberId(), rollingPaperId, pageNumber, pageSize, sortType, sortBy);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{rollingPaperId}")
    public ResponseEntity<?> deleteRollingPaper(Authentication authentication, @PathVariable Long rollingPaperId) throws Exception {

        Member member = memberService.findByEmail(authentication.getName());

        ApiResponse<?> response = rollingPaperService.deleteRollingPaper(member.getMemberId(), rollingPaperId);
        return ResponseEntity.ok(response);
    }


}
