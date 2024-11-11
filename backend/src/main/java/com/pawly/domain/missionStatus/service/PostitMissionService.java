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
public class PostitMissionService {

    private final MissionStatusRepository missionStatusRepository;
    private final MissionStatusService missionStatusService;
    private final FirebaseCloudMessageService firebaseCloudMessageService;

    // 도전과제 4번: 포스트잇 3회 생성
    @Transactional
    public void postitMission(Long memberId) {
        postit(memberId);

        boolean flag = postitThree(memberId);
        missionStatusService.mission(flag, 4L, memberId);

        FcmMessageRequestDto request = new FcmMessageRequestDto(memberId, "도전과제 달성!", "달성한 도전과제를 확인해보세요!");
        firebaseCloudMessageService.sendMessage(request);
    }

    @Transactional
    public void postit(Long memberId) {
        Optional<MissionStatus> missionStatus = missionStatusRepository.findByMemberId(memberId);

        if (missionStatus.isPresent()) {
            MissionStatus missionStatus1 = missionStatus.get();
            missionStatus1.postitPlus();
            missionStatusRepository.save(missionStatus1);
        }
    }

    private boolean postitThree(Long memberId) {
        Long count = missionStatusRepository.countRolllingPaper(memberId);

        return count == 3;
    }
}
