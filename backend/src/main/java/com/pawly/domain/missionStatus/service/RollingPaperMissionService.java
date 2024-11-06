package com.pawly.domain.missionStatus.service;

import com.pawly.domain.missionStatus.entity.MissionStatus;
import com.pawly.domain.missionStatus.repository.MissionStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class RollingPaperMissionService {

    private final MissionStatusRepository missionStatusRepository;

    public void rollingPaper(Long memberId) {
        Optional<MissionStatus> missionStatus = missionStatusRepository.findById(memberId);

        if (missionStatus.isPresent()) {
            MissionStatus missionStatus1 = missionStatus.get();
            missionStatus1.rollingPaperPlus();
        }
    }

    public boolean rollingPaperOne(Long memberId) {
        Long count = missionStatusRepository.countRolllingPaper(memberId);

        // 롤링페이퍼 수가 1이 아닐 경우 false 반환
        return count == 1;
    }
}
