package com.pawly.domain.member.service;

import com.pawly.domain.member.dto.response.SearchResponseDto;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Slf4j
public class MemberSearchService {

    private final MemberRepository memberRepository;

    public ApiResponse<?> memberSearch(String nickname, Long memberId) {
        List<Member> member = memberRepository.findByNicknameContainingAndExcludeSelf(nickname, memberId);

        List<SearchResponseDto> responseList = member.stream()
                .map(SearchResponseDto::info)
                .collect(Collectors.toList());

        return ApiResponse.createSuccess(responseList, "유저 검색 성공");
    }

    @Transactional
    public ApiResponse<?> fcmToken(Member member, String fcmToken) {
        if(fcmToken != null) {
            member.setFcmToken(fcmToken);
            return ApiResponse.createSuccessWithNoContent("토큰 설정 성공");
        }
        return ApiResponse.createError(ErrorCode.NO_FCM_TOKEN);
    }
}