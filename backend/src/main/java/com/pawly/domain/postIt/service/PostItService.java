package com.pawly.domain.postIt.service;

import com.pawly.domain.collection.service.CollectionService;
import com.pawly.domain.report.repository.ReportRepository;
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
import com.pawly.domain.theme.entity.Theme;
import com.pawly.domain.theme.repository.ThemeRepository;
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
    private final ThemeRepository themeRepository;
    private final PostitMissionService postitMissionService;
    private final CollectionService collectionService;

    @Transactional
    public ApiResponse<?> createPostIt(PostItCreateDto dto) {
        Optional<Member> requestMember = memberRepository.findByEmail(dto.getMemberName());
        if (requestMember.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Member member = requestMember.get();

        Optional<RollingPaper> rollingPaper = rollingPaperRepository.findById(dto.getRollingPaperId());
        if (rollingPaper.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        RollingPaper r = rollingPaper.get();

        if (r.isDeleteFlag()) return ApiResponse.createError(ErrorCode.ROLLING_PAPER_NOTFOUND);

        Optional<Theme> theme = themeRepository.findById(dto.getThemeId());
        if (theme.isEmpty()) return ApiResponse.createError(ErrorCode.THEME_NOT_FOUND);

        postItRepository.save(dto.toEntity(member, r, theme.get()));

        // 도감 저장
        collectionService.collectionAdd(member, r.getMember());

        // 알림
        FcmMessageRequestDto request = new FcmMessageRequestDto(r.getMember().getMemberId(), "롤링페이퍼가 작성되었어요!", "마음을 담은 롤링페이퍼가 작성되었습니다. 지금 확인해보세요.");
        firebaseCloudMessageService.sendMessage(request);

        // 도전과제
        postitMissionService.postitMission(member.getMemberId());

        return ApiResponse.createSuccessWithNoContent("포스트잇 생성 성공");
    }

    @Transactional
    public ApiResponse<?> readPostIt(String requestMemberName, Long postItId) {
        Optional<Member> requestMember = memberRepository.findByEmail(requestMemberName);
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

        PostItReadDto response = PostItReadDto.of(postItWriter, postIt.get(), postIt.get().getTheme());
        return ApiResponse.createSuccess(response, "차트 조회 성공");
    }

    @Transactional
    public ApiResponse<?> updatePostIt(PostItUpdateDto dto) {
        Optional<Member> requestMember = memberRepository.findByEmail(dto.getMemberName());
        if (requestMember.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Optional<PostIt> postIt = postItRepository.findById(dto.getPostItId());
        if (postIt.isEmpty() || postIt.get().getStatus() == Status.DELETE) {
            return ApiResponse.createError(ErrorCode.POST_IT_NOTFOUND);
        }

        Member postItWriter = postIt.get().getMember();

        if (!requestMember.get().equals(postItWriter)) return ApiResponse.createError(ErrorCode.ACCESS_DENIED);

        Optional<Theme> theme = themeRepository.findById(dto.getThemeId());
        if (theme.isEmpty()) return ApiResponse.createError(ErrorCode.THEME_NOT_FOUND);

        postIt.get().updatePostIt(dto, theme.get());
        return ApiResponse.createSuccessWithNoContent("포스트잇 수정 성공");
    }

    @Transactional
    public ApiResponse<?> deletePostIt(String requestMemberName, Long postItId) {
        Optional<Member> rqMember = memberRepository.findByEmail(requestMemberName);
        if (rqMember.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Optional<PostIt> postIt = postItRepository.findById(postItId);
        if (postIt.isEmpty() || postIt.get().getStatus() == Status.DELETE) {
            return ApiResponse.createError(ErrorCode.POST_IT_NOTFOUND);
        }

        Member postItWriter = postIt.get().getMember();

        if (!postItWriter.equals(rqMember.get())) return ApiResponse.createError(ErrorCode.ACCESS_DENIED);

        postIt.get().deletePostIt();
        return ApiResponse.createSuccessWithNoContent("포스트잇 삭제 성공");
    }

    @Transactional
    public ApiResponse<?> reportPostIt(PostReportCreateDto dto) {
        Optional<Member> requestMember = memberRepository.findByEmail(dto.getMemberName());
        if (requestMember.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Optional<PostIt> postIt = postItRepository.findById(dto.getPostId());
        if (postIt.isEmpty() || postIt.get().getStatus() == Status.DELETE) {
            return ApiResponse.createError(ErrorCode.POST_IT_NOTFOUND);
        }

        if (!postIt.get().getRollingPaper().getMember().equals(requestMember.get())) {
            return ApiResponse.createError(ErrorCode.ACCESS_DENIED);
        }

        reportRepository.save(dto.toEntity(requestMember.get(), dto.getPostId()));
        return ApiResponse.createSuccessWithNoContent("포스트잇 신고 성공");
    }
}
