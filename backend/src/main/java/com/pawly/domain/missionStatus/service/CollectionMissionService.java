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
public class CollectionMissionService {

    private final MissionStatusRepository missionStatusRepository;
    private final MissionStatusService missionStatusService;
    private final FirebaseCloudMessageService firebaseCloudMessageService;

    // 도전과제 5번: 도감 동물 10마리 생성
    @Transactional
    public void collectionMission(Long memberId) {
        collection(memberId);

        boolean flag = collectionTen(memberId);
        missionStatusService.mission(flag, 5L, memberId);

        FcmMessageRequestDto request = new FcmMessageRequestDto(memberId, "도전과제 달성!", "달성한 도전과제를 확인해보세요!");
        firebaseCloudMessageService.sendMessage(request);
    }

    @Transactional
    public void collection(Long memberId) {
        Optional<MissionStatus> missionStatus = missionStatusRepository.findByMemberId(memberId);

        if (missionStatus.isPresent()) {
            MissionStatus missionStatus1 = missionStatus.get();
            missionStatus1.collectionPlus();
            missionStatusRepository.save(missionStatus1);
        }
    }

    private boolean collectionTen(Long memberId) {
        Long count = missionStatusRepository.countCollection(memberId);
        return count == 10;
    }
}
