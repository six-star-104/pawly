package com.pawly.domain.postIt.service;

import com.pawly.domain.Report.repository.ReportRepository;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.domain.missionStatus.service.PostitMissionService;
import com.pawly.domain.postIt.dto.PostItCreateDto;
import com.pawly.domain.postIt.dto.PostItReadDto;
import com.pawly.domain.postIt.dto.PostItUpdateDto;
import com.pawly.domain.postIt.dto.PostReportCreateDto;
import com.pawly.domain.postIt.entity.PostIt;
import com.pawly.domain.postIt.enums.Status;
import com.pawly.domain.postIt.repository.PostItRepository;
import com.pawly.domain.rollingPaper.entity.RollingPaper;
import com.pawly.domain.rollingPaper.repository.RollingPaperRepository;
import com.pawly.global.dto.FcmMessageRequestDto;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import com.pawly.global.service.FirebaseCloudMessageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
public class PostItService {
    private final PostItRepository postItRepository;
    private final MemberRepository memberRepository;
    private final RollingPaperRepository rollingPaperRepository;
    private final ReportRepository reportRepository;
    private final FirebaseCloudMessageService firebaseCloudMessageService;
    private final PostitMissionService postitMissionService;

    @Transactional
    public ApiResponse<?> createPostIt(PostItCreateDto dto) {
        Optional<Member> requestMember = memberRepository.findById(dto.getMemberId());
        if (requestMember.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Member member = requestMember.get();

        Optional<RollingPaper> rollingPaper = rollingPaperRepository.findById(dto.getRollingPaperId());
        if (rollingPaper.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        RollingPaper rollingPaper1 = rollingPaper.get();

        postItRepository.save(dto.toEntity(member, rollingPaper1));

        FcmMessageRequestDto request = new FcmMessageRequestDto(rollingPaper1.getMember().getMemberId(), "롤링페이퍼가 작성되었어요!", "마음을 담은 롤링페이퍼가 작성되었습니다. 지금 확인해보세요.");
        firebaseCloudMessageService.sendMessage(request);

        postitMissionService.postitMission(member.getMemberId());

        return ApiResponse.createSuccess(null, "생성 성공");
    }

    @Transactional
    public ApiResponse<?> readPostIt(Long requestMemberId, Long postItId) {
        Optional<Member> requestMember = memberRepository.findById(requestMemberId);
        if (requestMember.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Optional<PostIt> postIt = postItRepository.findById(postItId);
        if (postIt.isEmpty() || postIt.get().getStatus() == Status.DELETE){
            return ApiResponse.createError(ErrorCode.POST_IT_NOTFOUND);
        }

        Member postItWriter = postIt.get().getMember();
        RollingPaper rollingPaper = postIt.get().getRollingPaper();
        Member rollingPaperOwner = rollingPaper.getMember();

        if (!requestMember.get().equals(rollingPaperOwner) || !requestMember.get().equals(postItWriter)) {
            return ApiResponse.createError(ErrorCode.ACCESS_DENIED);
        }

        PostItReadDto response = PostItReadDto.of(postItWriter, postIt.get());
        return ApiResponse.createSuccess(response, "차트 조회 성공");
    }

    @Transactional
    public ApiResponse<?> updatePostIt(PostItUpdateDto dto) {
        Optional<Member> requestMember = memberRepository.findById(dto.getMemberId());
        if (requestMember.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Optional<PostIt> postIt = postItRepository.findById(dto.getPostItId());
        if (postIt.isEmpty() || postIt.get().getStatus() == Status.DELETE) {
            return ApiResponse.createError(ErrorCode.POST_IT_NOTFOUND);
        }

        Member postItWriter = postIt.get().getMember();

        if (!requestMember.get().equals(postItWriter)) return ApiResponse.createError(ErrorCode.ACCESS_DENIED);

        postIt.get().updatePostIt(dto.getContent());
        return ApiResponse.createSuccess(null, "수정 성공");
    }

    @Transactional
    public ApiResponse<?> deletePostIt(Long requestMemberId, Long postItId) {
        Optional<Member> rqMember = memberRepository.findById(requestMemberId);
        if (rqMember.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Optional<PostIt> postIt = postItRepository.findById(postItId);
        if (postIt.isEmpty()) return ApiResponse.createError(ErrorCode.POST_IT_NOTFOUND);

        Member postItWriter = postIt.get().getMember();

        if (!postItWriter.equals(rqMember.get())) return ApiResponse.createError(ErrorCode.ACCESS_DENIED);

        postIt.get().deletePostIt();
        return ApiResponse.createSuccess(null, "삭제 성공");
    }

    @Transactional
    public ApiResponse<?> reportPostIt(PostReportCreateDto dto) {
        Optional<Member> requestMember = memberRepository.findById(dto.getMemberId());
        if (requestMember.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Optional<PostIt> postIt = postItRepository.findById(dto.getPostId());
        if (postIt.isEmpty()) return ApiResponse.createError(ErrorCode.POST_IT_NOTFOUND);

        if (!postIt.get().getRollingPaper().getMember().equals(requestMember.get())) {
            return ApiResponse.createError(ErrorCode.ACCESS_DENIED);
        }

        reportRepository.save(dto.toEntity(requestMember.get(), dto.getPostId()));
        return ApiResponse.createSuccess(null,"신고성공");
    }
}
