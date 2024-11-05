package com.pawly.domain.easterEgg.service;

import com.pawly.domain.easterEgg.dto.CompleteEasterEggDto;
import com.pawly.domain.easterEgg.dto.EasterEggResponseDto;
import com.pawly.domain.easterEgg.entity.CompleteEasterEgg;
import com.pawly.domain.easterEgg.entity.EasterEgg;
import com.pawly.domain.easterEgg.entity.Status;
import com.pawly.domain.easterEgg.repository.CompleteEasterEggRepository;
import com.pawly.domain.easterEgg.repository.EasterEggRepository;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EasterEggService {

    private final EasterEggRepository easterEggRepository;
    private final CompleteEasterEggRepository completeEasterEggRepository;

    public void initializeChallengesForNewUser(Long memberId) {
        List<EasterEgg> easterEggs = easterEggRepository.findAll();

        for (EasterEgg easterEgg : easterEggs) {
            CompleteEasterEggDto dto = new CompleteEasterEggDto(memberId, easterEgg, Status.IN_PROGRESS);
            CompleteEasterEgg challenge = new CompleteEasterEgg(dto);

            completeEasterEggRepository.save(challenge);
        }
    }

    public ApiResponse<?> getEasterEgg(Long memberId) {
        List<CompleteEasterEgg> list = completeEasterEggRepository.findByMemberId(memberId);

        List<EasterEggResponseDto> response = list.stream()
                .map(completeEasterEgg -> {
                    boolean isSecret = completeEasterEgg.getEasterEgg().isSecretFlag();
                    boolean isInProgress = completeEasterEgg.getStatus().equals(Status.IN_PROGRESS);

                    // secretFlag가 true이면서 IN_PROGRESS 상태일 때 "????" 처리
                    return isSecret && isInProgress
                            ? new EasterEggResponseDto(completeEasterEgg.getEasterEgg().getEasterEggId(), "????", "????", Status.IN_PROGRESS.getMessage(), null)
                            : EasterEggResponseDto.to(completeEasterEgg);
                })
                .collect(Collectors.toList());

        return ApiResponse.createSuccess(response, "도전과제 조회 성공");
    }

    @Transactional
    public ApiResponse<?> completeEasterEgg(Long memberId, Long easterEggId) {
        Optional<CompleteEasterEgg> optionalEasterEgg = completeEasterEggRepository.findByMemberIdAndCompleteEasterEggId(memberId, easterEggId);

        // 도전과제를 찾을 수 없는 경우
        if (optionalEasterEgg.isEmpty()) {
            return ApiResponse.createError(ErrorCode.NOT_FOUND_EASTER);
        }

        CompleteEasterEgg now = optionalEasterEgg.get();

        // 도전과제가 ACHIEVED 상태일 경우 완료 처리
        if (now.getStatus().equals(Status.ACHIEVED)) {
            now.updateStatus();
            return ApiResponse.createSuccessWithNoContent("도전과제 완료 성공");
        }

        // 도전과제가 ACHIEVED 상태가 아닐 경우
        return ApiResponse.createError(ErrorCode.NOT_STATUS);
    }
}
