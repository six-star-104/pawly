package com.pawly.domain.missionStatus.service;

import com.pawly.domain.easterEgg.entity.CompleteEasterEgg;
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

    public void initializeMissionStatus(Long memberId) {
        MissionStatus missionStatus = new MissionStatus(memberId);
        missionStatusRepository.save(missionStatus);
    }

    public void mission(boolean flag, Long easterEggId, Long memberId) {
        if (flag) {
            // 도전과제 조회
            Optional<CompleteEasterEgg> completeEasterEgg = completeEasterEggRepository.findByMemberIdAndEasterEggId(memberId, easterEggId);

            // 도전과제가 존재하지 않으면 예외를 던지기
            if (completeEasterEgg.isEmpty()) {
                throw new IllegalStateException("도전과제가 존재하지 않습니다.");
            }

            CompleteEasterEgg easterEgg = completeEasterEgg.get();
            easterEgg.achievedStatus();
        }
    }
}
