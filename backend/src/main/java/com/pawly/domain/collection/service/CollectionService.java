package com.pawly.domain.collection.service;

import com.pawly.domain.collection.dto.CollectionResponse;
import com.pawly.domain.collection.repository.CollectionRepository;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CollectionService {

    private final CollectionRepository collectionRepository;
    private final MemberRepository memberRepository;

    public ApiResponse<?> collectionList(Long memberId) {
        Optional<Member> memberOptional = memberRepository.findById(memberId);

        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();

            List<CollectionResponse> Collection = collectionRepository.findByMemberId1(member).stream()
                    .map(CollectionResponse::requestList)
                    .toList();

            return ApiResponse.createSuccess(Collection, "도감 조회 성공");
        }
        return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
    }

}
