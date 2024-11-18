package com.pawly.domain.collection.service;

import com.pawly.domain.collection.dto.CollectionResponse;
import com.pawly.domain.collection.entity.Collection;
import com.pawly.domain.collection.repository.CollectionRepository;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.domain.missionStatus.service.CollectionMissionService;
import com.pawly.domain.missionStatus.service.EventMissionService;
import com.pawly.global.dto.PageResponseDTO;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CollectionService {

    private final CollectionRepository collectionRepository;
    private final MemberRepository memberRepository;
    private final CollectionMissionService collectionMissionService;
    private final EventMissionService eventMissionService;

    public ApiResponse<?> collectionList(Long memberId, int pageNumber, int pageSize, String sortType, String sortBy) {

        Sort sort = sortType.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending()
            : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);


        Optional<Member> memberOptional = memberRepository.findById(memberId);

        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();

            Page<Collection> collectionPage = collectionRepository.findByMemberId1(member, pageable);

            List<CollectionResponse> collectionResponseList = collectionPage.stream()
                    .map(CollectionResponse::requestList)
                    .toList();

            PageResponseDTO pageResponseDTO = PageResponseDTO.builder()
                .content(collectionResponseList)
                .pageNumber(pageNumber)
                .pageSize(pageSize)
                .totalElements(collectionPage.getTotalElements())
                .totalPage((long) Math.ceil((double) collectionPage.getTotalElements() / pageSize))
                .build();

            return ApiResponse.createSuccess(pageResponseDTO, "도감 조회 성공");
        }
        return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);
    }

    @Transactional
    public void collectionAdd(Member member, Member friend) {
        if(!Objects.equals(member.getMemberId(), friend.getMemberId())) {
            Optional<Collection> collectionOptional = collectionRepository.findByMemberId1AndMemberId2(member, friend);

            if(collectionOptional.isEmpty()) {
                Collection collection = new Collection(member, friend);
                collectionRepository.save(collection);

                collectionMissionService.collectionMission(member.getMemberId());

                eventMissionService.processEventFriendAndCollection(member.getMemberId(), friend.getMemberId(), 1);
                eventMissionService.checkEventFriendAndCollection(member.getMemberId(), 1, 6L);
            }
        }
    }
}
