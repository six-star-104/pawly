package com.pawly.domain.easterEgg.service;

import com.pawly.domain.easterEgg.entity.MissionStatus;
import com.pawly.domain.easterEgg.repository.MissionStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MissionStatusService {

    private final MissionStatusRepository missionStatusRepository;

    public void initializeMissionStatus(Long memberId) {
        MissionStatus missionStatus = new MissionStatus(memberId);
        missionStatusRepository.save(missionStatus);
    }
}
