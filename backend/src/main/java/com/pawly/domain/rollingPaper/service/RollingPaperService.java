package com.pawly.domain.rollingPaper.service;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.domain.postIt.dto.PostItReadDto;
import com.pawly.domain.postIt.entity.PostIt;
import com.pawly.domain.postIt.enums.Status;
import com.pawly.domain.postIt.repository.PostItRepository;
import com.pawly.domain.postbox.dto.PostboxCreateDto;
import com.pawly.domain.postbox.enums.Statuse;
import com.pawly.domain.postbox.service.PostboxService;
import com.pawly.domain.rollingPaper.dto.RollingPaperCreateDto;
import com.pawly.domain.rollingPaper.dto.RollingPaperReadDto;
import com.pawly.domain.rollingPaper.entity.RollingPaper;
import com.pawly.domain.rollingPaper.repository.RollingPaperRepository;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RollingPaperService {
    private final PostboxService postboxService;
    private final RollingPaperRepository rollingPaperRepository;
    private final MemberRepository memberRepository;
    private final PostItRepository postItRepository;

    @Transactional
    public ApiResponse<?> createRollingPaper(RollingPaperCreateDto dto) {
        Optional<Member> member = memberRepository.findById(dto.getMemberId());
        if (!member.isPresent()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        RollingPaper createRollinPaper = rollingPaperRepository.save(dto.toEntity(member.get()));

        PostboxCreateDto postboxCreateDto = PostboxCreateDto.builder()
                .member(member.get())
                .rollingPaper(createRollinPaper)
                .title(dto.getTitle())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .statuse(Statuse.USE)
                .createdAt(LocalDateTime.now())
                .build();

        if (!postboxService.createPostbox(postboxCreateDto)){
            return ApiResponse.createError(ErrorCode.ROLLING_PAPER_CANNOT_CREATE);
        }
        return ApiResponse.createSuccess(null,"성공");
    }

//    public ApiResponse<?> createBirthDayRollingPaper(){
//
//    }

    @Transactional
    public ApiResponse<?> readAllRollingPaper(Long memberId, Pageable pageable) {
        Optional<Member> member = memberRepository.findById(memberId);
        if (!member.isPresent()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Slice<RollingPaper> rollingPapers = rollingPaperRepository.findByMember(member.get(), pageable);

        List<RollingPaperReadDto> rollingPaperReadDtos = new ArrayList<>();
        for (RollingPaper rollingPaper : rollingPapers) {
            rollingPaperReadDtos.add(RollingPaperReadDto.of(rollingPaper));
        }

        return ApiResponse.createSuccess(new SliceImpl<>(rollingPaperReadDtos, pageable, rollingPapers.hasNext()), "롤링페이퍼 조회 성공");
    }

    @Transactional
    public ApiResponse<?> readRollingPaper(Long memberId, Long rollingPaperId, Pageable pageable) {
        Optional<RollingPaper> rollingPaper = rollingPaperRepository.findById(rollingPaperId);
        if (!rollingPaper.isPresent()) return ApiResponse.createError(ErrorCode.ROLLING_PAPER_NOTFOUND);

        if (!rollingPaper.get().getMember().getMemberId().equals(memberId)) return  ApiResponse.createError(ErrorCode.ACCESS_DENIED);

        Slice<PostIt> postIts = postItRepository.findByRollingPaper(rollingPaper.get(), pageable);

        List<PostItReadDto> postItReadDtos = new ArrayList<>();
        for (PostIt postIt : postIts) {
            Optional<Member> postItMember = memberRepository.findById(postIt.getMember().getMemberId());
            if (!postItMember.isPresent()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
            postItReadDtos.add(PostItReadDto.of(postItMember.get(), postIt));
        }

        return ApiResponse.createSuccess(new SliceImpl<>(postItReadDtos, pageable, postIts.hasNext()), "롤링페이퍼 상세 조회 성공");
    }

    @Transactional
    public ApiResponse<?> deleteRollingPaper(Long memberId, Long rollingPaperId) {
        Optional<RollingPaper> rollingPaper = rollingPaperRepository.findById(rollingPaperId);
        if (!rollingPaper.isPresent()) return ApiResponse.createError(ErrorCode.ROLLING_PAPER_NOTFOUND);
        if (rollingPaper.get().isDeleteFlag()) return ApiResponse.createError(ErrorCode.ROLLING_PAPER_NOTFOUND);

        Member member = rollingPaper.get().getMember();

        Optional<Member> requestMember = memberRepository.findById(memberId);
        if (!requestMember.isPresent()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        if (!member.equals(requestMember.get())) return ApiResponse.createError(ErrorCode.ACCESS_DENIED);
        rollingPaper.get().delete();

        return ApiResponse.createSuccess(null, "RollingPaper 삭제 성공");
    }


}
