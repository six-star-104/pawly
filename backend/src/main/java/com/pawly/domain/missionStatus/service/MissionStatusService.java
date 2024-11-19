package com.pawly.domain.missionStatus.service;

import com.pawly.domain.easterEgg.entity.CompleteEasterEgg;
import com.pawly.domain.easterEgg.service.EasterEggService;
import com.pawly.domain.missionStatus.entity.MissionStatus;
import com.pawly.domain.easterEgg.repository.CompleteEasterEggRepository;
import com.pawly.domain.missionStatus.repository.MissionStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MissionStatusService {

    private final MissionStatusRepository missionStatusRepository;
    private final CompleteEasterEggRepository completeEasterEggRepository;
    private final EasterEggService easterEggService;

    public void initializeMissionStatus(Long memberId) {
        MissionStatus missionStatus = new MissionStatus(memberId);
        missionStatusRepository.save(missionStatus);
    }

    public void mission(boolean flag, Long easterEggId, Long memberId) {
        if (flag) {
            // 도전과제 조회
            Optional<CompleteEasterEgg> completeEasterEgg = completeEasterEggRepository.findByMemberIdAndEasterEggId(memberId, easterEggId);

            // 도전과제가 존재하지 않으면 초기화
            CompleteEasterEgg easterEgg = completeEasterEgg.orElseGet(() -> {
                easterEggService.initializeChallengesForNewUser(memberId);
                // 초기화 후 다시 조회
                return completeEasterEggRepository.findByMemberIdAndEasterEggId(memberId, easterEggId)
                        .orElseThrow(() -> new IllegalStateException("도전과제 초기화 후에도 찾을 수 없습니다."));
            });

            // 도전과제 달성 상태 업데이트
            easterEgg.achievedStatus();
        }
    }
}
