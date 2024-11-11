package com.pawly.domain.easterEgg.service;

import com.pawly.domain.easterEgg.dto.CompleteEasterEggDto;
import com.pawly.domain.easterEgg.dto.EasterEggResponseDto;
import com.pawly.domain.easterEgg.entity.CompleteEasterEgg;
import com.pawly.domain.easterEgg.entity.EasterEgg;
import com.pawly.domain.easterEgg.entity.Status;
import com.pawly.domain.easterEgg.repository.CompleteEasterEggRepository;
import com.pawly.domain.easterEgg.repository.EasterEggRepository;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EasterEggService {

    private final EasterEggRepository easterEggRepository;
    private final CompleteEasterEggRepository completeEasterEggRepository;
    private final MemberRepository memberRepository;

    public void initializeChallengesForNewUser(Long memberId) {
        List<EasterEgg> easterEggs = easterEggRepository.findAll();

        for (EasterEgg easterEgg : easterEggs) {
            Status status = (easterEgg.getEasterEggId() == 1) ? Status.ACHIEVED : Status.IN_PROGRESS;

            CompleteEasterEggDto dto = new CompleteEasterEggDto(memberId, easterEgg, status);
            CompleteEasterEgg challenge = new CompleteEasterEgg(dto);

            completeEasterEggRepository.save(challenge);
        }
    }

    public ApiResponse<?> getEasterEgg(String email) {
        Optional<Member> Optionalmember = memberRepository.findByEmail(email);
        if (Optionalmember.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Member member = Optionalmember.get();

        List<CompleteEasterEgg> list = completeEasterEggRepository.findByMemberId(member.getMemberId());
        if (list.isEmpty()) {
            initializeChallengesForNewUser(member.getMemberId());
            // 다시 리스트를 조회하여 초기화된 도전 과제 반환
            list = completeEasterEggRepository.findByMemberId(member.getMemberId());
        }

        List<EasterEggResponseDto> response = list.stream()
                .map(completeEasterEgg -> {
                    boolean isSecret = completeEasterEgg.getEasterEgg().isSecretFlag();
                    boolean isInProgress = completeEasterEgg.getStatus().equals(Status.IN_PROGRESS);

                    // secretFlag가 true이면서 IN_PROGRESS 상태일 때 "????" 처리
                    return isSecret && isInProgress
                            ? new EasterEggResponseDto(completeEasterEgg.getCompleteEasterEggId(), "????", "????", Status.IN_PROGRESS.getMessage(), null)
                            : EasterEggResponseDto.to(completeEasterEgg);
                })
                .collect(Collectors.toList());


        return ApiResponse.createSuccess(response, "도전과제 조회 성공");
    }

    @Transactional
    public ApiResponse<?> completeEasterEgg(String email, Long easterEggId) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
        if(easterEggId == null) return ApiResponse.createError(ErrorCode.NOT_EASTER_EGG_ID);

        Optional<CompleteEasterEgg> optionalEasterEgg = completeEasterEggRepository.findById(easterEggId);

        if (optionalEasterEgg.isEmpty()) return ApiResponse.createError(ErrorCode.NOT_FOUND_EASTER);

        CompleteEasterEgg now =  optionalEasterEgg.get();

        if(!Objects.equals(now.getMemberId(), member.get().getMemberId())) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        // 도전과제가 ACHIEVED 상태일 경우 완료 처리
        if (now.getStatus().equals(Status.ACHIEVED)) {
            now.updateStatus();
            return ApiResponse.createSuccessWithNoContent("도전과제 완료 성공");
        }

        // 도전과제가 ACHIEVED 상태가 아닐 경우
        return ApiResponse.createError(ErrorCode.NOT_STATUS);
    }
}