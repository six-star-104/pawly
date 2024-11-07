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
public class PostitMissionService {

    private final MissionStatusRepository missionStatusRepository;

    public void postit(Long memberId) {
        Optional<MissionStatus> missionStatus = missionStatusRepository.findById(memberId);

        if (missionStatus.isPresent()) {
            MissionStatus missionStatus1 = missionStatus.get();
            missionStatus1.postitPlus();
        }
    }

    public boolean postitThree(Long memberId) {
        Long count = missionStatusRepository.countRolllingPaper(memberId);

        return count == 3;
    }
}
