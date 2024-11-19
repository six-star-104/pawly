package com.pawly.domain.missionStatus.service;

import com.pawly.domain.missionStatus.entity.MissionStatus;
import com.pawly.domain.missionStatus.repository.MissionStatusRepository;
import com.pawly.global.dto.FcmMessageRequestDto;
import com.pawly.global.service.FirebaseCloudMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LetterMissionService {

    private final MissionStatusRepository missionStatusRepository;
    private final MissionStatusService missionStatusService;
    private final FirebaseCloudMessageService firebaseCloudMessageService;

    // 도전과제 3번: 편지 3회 작성
    @Transactional
    public void sendLetterMission(Long memberId) {
        sendLetter(memberId);

        boolean flag = sendLetterThree(memberId);

        if(flag) {
            missionStatusService.mission(flag, 3L, memberId);

            FcmMessageRequestDto request = new FcmMessageRequestDto(memberId, "도전과제 달성!", "달성한 도전과제를 확인해보세요!");
            firebaseCloudMessageService.sendMessage(request);
        }
    }

    // 도전과제 7번: 편지 5회 받기
    @Transactional
    public void receiveLetterMission(Long memberId) {
        receiveLetter(memberId);

        boolean flag = receiveLetterFive(memberId);

        if(flag) {
            missionStatusService.mission(flag, 7L, memberId);

            FcmMessageRequestDto request = new FcmMessageRequestDto(memberId, "도전과제 달성!", "달성한 도전과제를 확인해보세요!");
            firebaseCloudMessageService.sendMessage(request);
        }
    }

    @Transactional
    public void sendLetter(Long memberId) {
        Optional<MissionStatus> missionStatus = missionStatusRepository.findByMemberId(memberId);

        if (missionStatus.isPresent()) {
            MissionStatus missionStatus1 = missionStatus.get();
            missionStatus1.sendLetterPlus();
            missionStatusRepository.save(missionStatus1);
        }
    }

    @Transactional
    public void receiveLetter(Long memberId) {
        Optional<MissionStatus> missionStatus = missionStatusRepository.findByMemberId(memberId);

        if (missionStatus.isPresent()) {
            MissionStatus missionStatus1 = missionStatus.get();
            missionStatus1.receiveLetterPlus();
            missionStatusRepository.save(missionStatus1);
        }
    }

    private boolean sendLetterThree(Long memberId) {
        Long count = missionStatusRepository.countSendLetter(memberId);
        return count == 3;
    }

    private boolean receiveLetterFive(Long memberId) {
        Long count = missionStatusRepository.countReceiveLetter(memberId);
        return count == 5;
    }
}
