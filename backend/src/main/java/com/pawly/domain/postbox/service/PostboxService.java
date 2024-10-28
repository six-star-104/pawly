package com.pawly.domain.postbox.service;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.domain.postbox.controller.dto.PostboxReadRequest;
import com.pawly.domain.postbox.dto.PostboxCreateDto;
import com.pawly.domain.postbox.entity.Postbox;
import com.pawly.domain.postbox.repository.PostboxRepository;
import com.pawly.domain.rollingPaper.entity.RollingPaper;
import com.pawly.domain.rollingPaper.repository.RollingPaperRepository;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@AllArgsConstructor
public class PostboxService {
    private final PostboxRepository postboxRepository;
    private final RollingPaperRepository rollingPaperRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public ApiResponse<Object> createPostbox(PostboxCreateDto dto){
        Optional<RollingPaper> rollingPaper = rollingPaperRepository.findById(dto.getRollingPaperId());
        if (!rollingPaper.isPresent()) return ApiResponse.createError(ErrorCode.ROLLING_PAPER_NOTFOUND);

        Optional<Member> member = memberRepository.findById(dto.getMemberId());
        if (!member.isPresent()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Postbox postbox = postboxRepository.save(dto.toEntity(member.get(), rollingPaper.get()));
        return ApiResponse.createSuccess(postbox, "postbox 생성 완료");
    }

    @Transactional
    public boolean postboxArRead(PostboxReadRequest request) {

    }
}
