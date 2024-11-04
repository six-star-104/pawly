package com.pawly.domain.postIt.controller;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.service.MemberService;
import com.pawly.domain.postIt.controller.dto.PostItCreateRequest;
import com.pawly.domain.postIt.controller.dto.PostItUpdateRequest;
import com.pawly.domain.postIt.controller.dto.PostReportRequest;
import com.pawly.domain.postIt.service.PostItService;
import com.pawly.global.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/postit")
@RequiredArgsConstructor
public class PostItController {
    private final PostItService postItService;
    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<?> createPostIt(Authentication authentication, @Valid @RequestBody PostItCreateRequest postItCreateRequest) throws Exception {

        Member member = memberService.findByEmail(authentication.getName());

        ApiResponse<?> response = postItService.createPostIt(postItCreateRequest.toDto(member.getMemberId()));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{postitId}")
    public ResponseEntity<?> readPostIt(Authentication authentication, @PathVariable Long postitId) throws Exception {

        Member member = memberService.findByEmail(authentication.getName());

        ApiResponse<?> response = postItService.readPostIt(member.getMemberId(), postitId);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{postitId}")
    public ResponseEntity<?> updatePostIt(Authentication authentication, @PathVariable Long postitId,
                                            @Valid @RequestBody PostItUpdateRequest postItUpdateRequest) throws Exception {

        Member member = memberService.findByEmail(authentication.getName());

        ApiResponse<?> response = postItService.updatePostIt(postItUpdateRequest.toDto(member.getMemberId(), postitId));
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{postitId}")
    public ResponseEntity<?> deletePostIt(Authentication authentication, @PathVariable Long postitId) throws Exception {

        Member member = memberService.findByEmail(authentication.getName());

        ApiResponse<?> response = postItService.deletePostIt(member.getMemberId(), postitId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{postitId}")
    public ResponseEntity<?> reportPostIt(Authentication authentication, @PathVariable Long postitId,
                                                    @Valid @RequestBody PostReportRequest postReportRequest) throws Exception {

        Member member = memberService.findByEmail(authentication.getName());

        ApiResponse<?> response = postItService.reportPostIt(postReportRequest.toDto(member.getMemberId(), postitId));
        return ResponseEntity.ok(response);
    }


}
