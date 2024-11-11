package com.pawly.domain.rollingPaper.service;

import com.pawly.domain.easterEgg.entity.CompleteEasterEgg;
import com.pawly.domain.easterEgg.repository.CompleteEasterEggRepository;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.domain.missionStatus.service.RollingPaperMissionService;
import com.pawly.domain.postIt.dto.PostItReadDto;
import com.pawly.domain.postIt.entity.PostIt;
import com.pawly.domain.postIt.repository.PostItRepository;
import com.pawly.domain.postbox.dto.PostboxCreateDto;
import com.pawly.domain.postbox.entity.Postbox;
import com.pawly.domain.postbox.enums.Status;
import com.pawly.domain.postbox.repository.PostboxRepository;
import com.pawly.domain.postbox.service.PostboxService;
import com.pawly.domain.rollingPaper.dto.RollingPaperCreateDto;
import com.pawly.domain.rollingPaper.dto.RollingPaperReadAllDto;
import com.pawly.domain.rollingPaper.dto.RollingPaperReadDto;
import com.pawly.domain.rollingPaper.entity.RollingPaper;
import com.pawly.domain.rollingPaper.repository.RollingPaperRepository;
import com.pawly.domain.theme.entity.Theme;
import com.pawly.domain.theme.repository.ThemeRepository;
import com.pawly.global.dto.FcmMessageRequestDto;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import com.pawly.global.service.FirebaseCloudMessageService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RollingPaperService {
    private final PostboxService postboxService;
    private final RollingPaperRepository rollingPaperRepository;
    private final MemberRepository memberRepository;
    private final PostItRepository postItRepository;
    private final RollingPaperMissionService rollingPaperMissionService;
    private final PostboxRepository postboxRepository;
    private final ThemeRepository themeRepository;
    private final FirebaseCloudMessageService firebaseCloudMessageService;
    private final CompleteEasterEggRepository  completeEasterEggRepository;

    @Transactional
    public ApiResponse<?> createRollingPaper(RollingPaperCreateDto dto) {
        Optional<Member> member = memberRepository.findByEmail(dto.getMemberName());
        if (member.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Member m  = member.get();

        List<RollingPaper> rollingPapers = rollingPaperRepository.findByMember(m);
        if (rollingPapers.size() > 3) return ApiResponse.createError(ErrorCode.POSTBOX_TOO_MANY);

        List<Postbox> postboxes = postboxRepository.findPostboxesByMemberWithinRadius(m, dto.getLatitude(), dto.getLongitude(), 5.0);
        if (!postboxes.isEmpty()) return ApiResponse.createError(ErrorCode.POSTBOX_ALREADY_LOCATED);

        List<Postbox> postboxes1 = postboxRepository.findPostboxesWithinRadius(dto.getLatitude(), dto.getLongitude(), 1.0);
        if (!postboxes1.isEmpty()) return ApiResponse.createError(ErrorCode.POSTBOX_ALREADY_LOCATED);

        RollingPaper createRollinPaper = rollingPaperRepository.save(dto.toEntity(m, 1));

        PostboxCreateDto postboxCreateDto = PostboxCreateDto.builder()
                .member(m)
                .rollingPaper(createRollinPaper)
                .title(dto.getTitle())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .statuse(Status.USE)
                .createdAt(LocalDateTime.now())
                .build();

        if (!postboxService.createPostbox(postboxCreateDto)) {
            return ApiResponse.createError(ErrorCode.ROLLING_PAPER_CANNOT_CREATE);
        }
        rollingPaperMissionService.rollingPaperMission(m.getMemberId());

        return ApiResponse.createSuccessWithNoContent("롤링페이퍼 작성 성공");
    }

    @Transactional
    @Scheduled(cron = "0 0 0 * * *")
    public void createBirthDayRollingPaper() {
        List<Member> members = memberRepository.findByBirthInThreeDays();
        for (Member member : members) {
            RollingPaperCreateDto rollingPaperCreateDto = RollingPaperCreateDto.builder()
                    .title(member.getName() + "님의 생일 롤링페이퍼")
                    .build();
            rollingPaperRepository.save(rollingPaperCreateDto.toEntity(member, 2));
        }
    }

    @Transactional
    @Scheduled(cron = "0 0 0 * * *")
    public void findBirthDayRollingPaper() {
        List<Member> members = memberRepository.findTodayBirthdayMembers();
        for (Member member : members) {
            FcmMessageRequestDto request = new FcmMessageRequestDto(member.getMemberId(), "생일 롤링페이퍼가 도착했어요!", "친구에게서 따뜻한 생일 롤링페이퍼가 도착했습니다. 확인해보세요.");
            firebaseCloudMessageService.sendMessage(request);

            Optional<CompleteEasterEgg> completeEasterEgg = completeEasterEggRepository.findByMemberIdAndEasterEggId(member.getMemberId(), 6L);

            // 도전과제 6번: 생일 롤링페이퍼 오픈
            if (completeEasterEgg.isPresent()) {
                CompleteEasterEgg completeEasterEgg1 = completeEasterEgg.get();

                if(completeEasterEgg1.getStatus() == com.pawly.domain.easterEgg.entity.Status.IN_PROGRESS) {
                    completeEasterEgg1.achievedStatus();

                    FcmMessageRequestDto request2 = new FcmMessageRequestDto(member.getMemberId(), "도전과제 달성!", "달성한 도전과제를 확인해보세요!");
                    firebaseCloudMessageService.sendMessage(request2);
                }
            }
        }
    }

    @Transactional
    public ApiResponse<?> readAllRollingPaper(String memberName, Pageable pageable) {
        Optional<Member> member = memberRepository.findByEmail(memberName);
        if (member.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Slice<RollingPaper> rollingPapers = rollingPaperRepository.findByMember(member.get(), pageable);

        List<RollingPaperReadDto> rollingPaperReadDtos = rollingPapers.stream()
                .map(RollingPaperReadDto::of)
                .toList();

        return ApiResponse.createSuccess(new SliceImpl<>(rollingPaperReadDtos, pageable, rollingPapers.hasNext()), "롤링페이퍼 조회 성공");
    }

    @Transactional
    public ApiResponse<?> readRollingPaper(String memberName, Long rollingPaperId, int pageNumber, int pageSize, String sortType, String sortBy) {
        Optional<Member> optionalMember = memberRepository.findByEmail(memberName);
        if (optionalMember.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Member member = optionalMember.get();

        Optional<RollingPaper> optionalRollingPaper = rollingPaperRepository.findById(rollingPaperId);
        if (optionalRollingPaper.isEmpty() || optionalRollingPaper.get().isDeleteFlag()) return ApiResponse.createError(ErrorCode.ROLLING_PAPER_NOTFOUND);

        RollingPaper rollingPaper = optionalRollingPaper.get();

        if (!rollingPaper.getMember().equals(member)) return ApiResponse.createError(ErrorCode.ACCESS_DENIED);

        if (rollingPaper.getCategory() == 2 && member.getBirth() != null)
            if(!rollingPaper.getCreatedAt().plusDays(4).isBefore(LocalDateTime.now())) return ApiResponse.createError(ErrorCode.ACCESS_DENIED);

        Sort sort = sortType.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<PostIt> postIts = postItRepository.findByRollingPaper(rollingPaper, pageable);

        List<PostItReadDto> postItReadDtos = new ArrayList<>();
        for (PostIt postIt : postIts) {
            Optional<Member> postItMember = memberRepository.findById(postIt.getMember().getMemberId());
            if (postItMember.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

            Optional<Theme> theme = themeRepository.findById(postIt.getTheme().getThemeId());
            if (theme.isEmpty()) return ApiResponse.createError(ErrorCode.THEME_NOT_FOUND);

            postItReadDtos.add(PostItReadDto.of(postItMember.get(), postIt, theme.get()));
        }

        RollingPaperReadAllDto rollingPaperReadAllDto = RollingPaperReadAllDto.toDto(postItReadDtos, rollingPaper, pageNumber, pageSize, (long) Math.ceil((double) postIts.getTotalElements() / pageSize),postIts.getTotalElements());
        return ApiResponse.createSuccess(rollingPaperReadAllDto,"롤링페이퍼 상세 조회 성공");
    }

    @Transactional
    public ApiResponse<?> deleteRollingPaper(String memberName, Long rollingPaperId) {
        Optional<RollingPaper> rollingPaper = rollingPaperRepository.findById(rollingPaperId);
        if (rollingPaper.isEmpty()) return ApiResponse.createError(ErrorCode.ROLLING_PAPER_NOTFOUND);
        RollingPaper r = rollingPaper.get();
        if (r.isDeleteFlag()) return ApiResponse.createError(ErrorCode.ROLLING_PAPER_NOTFOUND);

        Member member = r.getMember();

        Optional<Member> requestMember = memberRepository.findByEmail(memberName);
        if (requestMember.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        if (!member.equals(requestMember.get())) return ApiResponse.createError(ErrorCode.ACCESS_DENIED);

        Optional<Postbox> postbox = Optional.ofNullable(postboxRepository.findByRollingpaper(r));
        if (postbox.isEmpty()) return ApiResponse.createError(ErrorCode.POSTBOX_NOT_FOUND);

        List<PostIt> postIts = postItRepository.findByRollingPaper(r);
        for (PostIt postIt : postIts) {
            postIt.deletePostIt();
        }

        r.delete();
        postbox.get().deletePostbox();

        return ApiResponse.createSuccessWithNoContent("RollingPaper 삭제 성공");
    }
}
