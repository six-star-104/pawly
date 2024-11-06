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
public class LetterMissionService {

    private final MissionStatusRepository missionStatusRepository;

    public void sendLetter(Long memberId) {
        Optional<MissionStatus> missionStatus = missionStatusRepository.findById(memberId);

        if (missionStatus.isPresent()) {
            MissionStatus missionStatus1 = missionStatus.get();
            missionStatus1.sendLetterPlus();
        }
    }

    public void receiveLetter(Long memberId) {
        Optional<MissionStatus> missionStatus = missionStatusRepository.findById(memberId);

        if (missionStatus.isPresent()) {
            MissionStatus missionStatus1 = missionStatus.get();
            missionStatus1.receiveLetterPlus();
        }
    }

    public boolean sendLetterThree(Long memberId) {
        Long count = missionStatusRepository.countSendLetter(memberId);
        return count == 3;
    }

    public boolean receiveLetterFive(Long memberId) {
        Long count = missionStatusRepository.countReceiveLetter(memberId);
        return count == 5;
    }
}
