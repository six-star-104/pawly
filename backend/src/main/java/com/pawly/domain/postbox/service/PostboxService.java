package com.pawly.domain.postbox.service;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.domain.postbox.dto.PostboxCreateDto;
import com.pawly.domain.postbox.dto.PostboxReadResponseDto;
import com.pawly.domain.postbox.entity.Postbox;
import com.pawly.domain.postbox.repository.PostboxRepository;
import com.pawly.domain.rollingPaper.repository.RollingPaperRepository;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostboxService {
    private final PostboxRepository postboxRepository;
    private final RollingPaperRepository rollingPaperRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public boolean createPostbox(PostboxCreateDto dto){
        try {
            Postbox postbox = postboxRepository.save(dto.toEntity());
            return true;
        } catch (Exception e){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return false;
        }
    }

    @Transactional
    public ApiResponse<?> postboxArRead(String name, Double latitude, Double longitude) {
        Optional<Member> member = memberRepository.findByEmail(name);
        if (!member.isPresent()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        List<PostboxReadResponseDto> postboxReadResponsesList = postboxRepository.findPostboxesWithinRadius(latitude, longitude, 10.0).stream()
                        .map(postbox -> PostboxReadResponseDto.from(postbox, postbox.getMember().getAssets()))
                        .toList();

        return ApiResponse.createSuccess(postboxReadResponsesList,"AR 우체통 조회 성공");
    }

    @Transactional
    public ApiResponse<?> postboxMapRead(String name, Double latitude, Double longitude) {
        Optional<Member> member = memberRepository.findByEmail(name);
        if (!member.isPresent()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        List<PostboxReadResponseDto> postboxReadResponsesList = postboxRepository.findPostboxesWithinRadius(latitude, longitude, 1000.0).stream()
                .map(postbox -> PostboxReadResponseDto.from(postbox, postbox.getMember().getAssets()))
                .toList();
        return ApiResponse.createSuccess(postboxReadResponsesList, "우체통맵 조회 성공");
    }
}
