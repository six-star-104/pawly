package com.pawly.global.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.global.dto.FcmMessageRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FirebaseCloudMessageService {

    private final MemberRepository memberRepository;

    public String sendMessage(FcmMessageRequestDto requestDto) {
        // 사용자의 Firebase 토큰 값을 조회
        String userFirebaseToken = memberRepository.findFcmTokenByMemberId(requestDto.getMemberId());

        // 메시지 구성
        Message message = Message.builder()
                .setNotification(Notification.builder()
                        .setTitle(requestDto.getTitle())
                        .setBody(requestDto.getContent())
                        .build())
                .putData("title", requestDto.getTitle())
                .putData("content", requestDto.getContent())
                .setToken(userFirebaseToken) // 조회한 토큰 값을 사용
                .build();

        try {
            // 메시지 전송
            String response = FirebaseMessaging.getInstance().send(message);
            return "Message sent successfully: " + response;
        } catch (FirebaseMessagingException e) {
            e.printStackTrace();
            return "Failed to send message";
        }
    }
}