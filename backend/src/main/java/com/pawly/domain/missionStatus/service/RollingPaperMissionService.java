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
public class RollingPaperMissionService {

    private final MissionStatusRepository missionStatusRepository;
    private final MissionStatusService missionStatusService;
    private final FirebaseCloudMessageService firebaseCloudMessageService;

    // 도전과제 2번: 우체통(롤링페이퍼) 1회 생성
    @Transactional
    public void rollingPaperMission(Long memberId) {
        rollingPaper(memberId);

        boolean flag = rollingPaperOne(memberId);

        if(flag) {
            missionStatusService.mission(flag, 2L, memberId);

            FcmMessageRequestDto request = new FcmMessageRequestDto(memberId, "도전과제 달성!", "달성한 도전과제를 확인해보세요!");
            firebaseCloudMessageService.sendMessage(request);
        }
    }

    @Transactional
    public void rollingPaper(Long memberId) {
        Optional<MissionStatus> missionStatus = missionStatusRepository.findByMemberId(memberId);

        if (missionStatus.isPresent()) {
            MissionStatus missionStatus1 = missionStatus.get();
            missionStatus1.rollingPaperPlus();
            missionStatusRepository.save(missionStatus1);
        }
    }

    private boolean rollingPaperOne(Long memberId) {
        Long count = missionStatusRepository.countRollingPaper(memberId);

        return count == 1;
    }
}
