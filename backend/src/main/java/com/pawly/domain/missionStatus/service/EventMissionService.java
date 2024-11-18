package com.pawly.domain.missionStatus.service;

import com.pawly.domain.easterEgg.entity.CompleteEasterEgg;
import com.pawly.domain.easterEgg.entity.Status;
import com.pawly.domain.easterEgg.repository.CompleteEasterEggRepository;
import com.pawly.domain.missionStatus.entity.Event;
import com.pawly.domain.missionStatus.repository.EventRepository;
import com.pawly.global.dto.FcmMessageRequestDto;
import com.pawly.global.service.FirebaseCloudMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventMissionService {

    private final EventRepository eventRepository;
    private final CompleteEasterEggRepository completeEasterEggRepository;
    private final FirebaseCloudMessageService firebaseCloudMessageService;

    @Transactional
    public void processEventFriendAndCollection(Long memberId, Long memberId2, int type) {
        if(memberId2 == 71 || memberId2 == 72) {
            Optional<Event> eventOptional = eventRepository.findByMemberIdAndMemberId2AndType(memberId, memberId2, type);

            if (eventOptional.isEmpty()) {
                Event event = new Event(memberId, memberId2, type);
                eventRepository.save(event);
            }
        }
    }

    @Transactional
    public void checkEventFriendAndCollection(Long memberId, int type, Long easterEggId) {
        int eventCount = eventRepository.countByMemberIdAndType(memberId, type);

        if (eventCount >= 2) {
            Optional<CompleteEasterEgg> completeEasterEggOptional = completeEasterEggRepository.findByMemberIdAndEasterEggId(memberId, easterEggId);

            if (completeEasterEggOptional.isPresent()) {
                CompleteEasterEgg completeEasterEgg = completeEasterEggOptional.get();

                if (completeEasterEgg.getStatus() == Status.IN_PROGRESS) {
                    completeEasterEgg.updateStatus();
                }
            }

            FcmMessageRequestDto request = new FcmMessageRequestDto(memberId, "도전과제 달성!", "달성한 도전과제를 확인해보세요!");
            firebaseCloudMessageService.sendMessage(request);
        }
    }

    // 친구맺기 및 도감 모으기 처리
//    @Transactional
//    public void processEventFriendAndCollection(Long memberId, Long memberId2) {
//        handleEvent(memberId, memberId2, 1); // 친구맺기 이벤트
//        handleEvent(memberId, memberId2, 2); // 도감 모으기 이벤트
//    }
//
//    // 친구맺기 및 도감 모으기 체크
//    @Transactional
//    public void checkEventFriendAndCollection(Long memberId) {
//        checkEventCompletion(memberId, 1, 6L); // 친구맺기 완료 체크
//        checkEventCompletion(memberId, 2, 7L); // 도감 모으기 완료 체크
//    }
}
