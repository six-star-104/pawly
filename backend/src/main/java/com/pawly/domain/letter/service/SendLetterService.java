package com.pawly.domain.letter.service;

import com.pawly.domain.collection.service.CollectionService;
import com.pawly.domain.letter.dto.request.LetterRequestDTO;
import com.pawly.domain.letter.dto.response.SendLetterDetailResponseDTO;
import com.pawly.domain.letter.dto.response.SendLetterResponseDTO;
import com.pawly.domain.letter.entity.Letter;
import com.pawly.domain.letter.repository.LetterRepository;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.domain.member.service.MemberServiceImpl;
import com.pawly.domain.missionStatus.service.LetterMissionService;
import com.pawly.global.dto.FcmMessageRequestDto;
import com.pawly.global.dto.PageResponseDTO;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import com.pawly.global.service.FileService;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import com.pawly.global.service.FirebaseCloudMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SendLetterService {

    private final LetterRepository letterRepository;
    private final MemberRepository memberRepository;
    private final MemberServiceImpl memberService;
    private final FirebaseCloudMessageService firebaseCloudMessageService;
    private final LetterMissionService letterMissionService;
    private final FileService fileService;
    private final CollectionService collectionService;

    public PageResponseDTO getSendLetters(Member member, int pageNumber, int pageSize, String sortType, String sortBy) {

        Sort sort = sortType.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending()
            : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Page<Letter> sendLetters = letterRepository.findBySenderAndSenderDeleteFlagFalse(member, pageable);

        List<SendLetterResponseDTO> sendLetterResponseDTOS = sendLetters.stream()
            .map(SendLetterResponseDTO::toDTO)
            .toList();

        return PageResponseDTO.builder()
            .content(sendLetterResponseDTOS)
            .pageSize(pageSize)
            .pageNumber(pageNumber)
            .totalElements(sendLetters.getTotalElements())
            .totalPage((long) Math.ceil((double) sendLetters.getTotalElements() / pageSize))
            .build();
    }

    public ApiResponse<?> getLetter(String email, Long sendLetterId) {
        Member member = memberService.findByEmail2(email);
        if (member == null) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Optional<Letter> letter = letterRepository.findBySenderAndLetterIdAndSenderDeleteFlagFalse(member, sendLetterId);
        if(letter.isEmpty()) return ApiResponse.createError(ErrorCode.LETTER_NOT_FOUND);

        return ApiResponse.createSuccess(SendLetterDetailResponseDTO.toDTO(letter.get()), "보낸 편지 상세 조회 성공");
    }

    @Transactional
    public ApiResponse<?> sendLetter(String email, LetterRequestDTO letterRequestDTO, MultipartFile picture) throws IOException {
        Member member = memberService.findByEmail2(email); // 보낸 사람
        if (member == null) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Member recipient = memberRepository.getReferenceById(letterRequestDTO.getRecipientId()); // 받는 사람

        // 받는 사람 == 보낸 사람 오류
        if(Objects.equals(member.getMemberId(), recipient.getMemberId())) return ApiResponse.createError(ErrorCode.LETTER_SEND_FAILED);

        Letter letter = Letter.builder()
            .sender(member)
            .recipient(recipient)
            .content(letterRequestDTO.getContent())
            .recipientDeleteFlag(false)
            .senderDeleteFlag(false)
            .build();

        letterRepository.save(letter);

        // 파일 저장
        if(picture != null && !picture.isEmpty()) {
            String fileUrl = fileService.savePicture(picture);
            letter.updatePicture(fileUrl);
        }

        // 알림
        FcmMessageRequestDto request = new FcmMessageRequestDto(recipient.getMemberId(), "새 편지가 도착했어요!", "친구에게서 따뜻한 편지가 도착했습니다. 확인해보세요.");
        firebaseCloudMessageService.sendMessage(request);

        // 도전과제
        letterMissionService.sendLetterMission(member.getMemberId());
        letterMissionService.receiveLetterMission(recipient.getMemberId());

        // 도감 저장
        if(!Objects.equals(member.getMemberId(), recipient.getMemberId())) collectionService.collectionAdd(member, recipient);

        return ApiResponse.createSuccessWithNoContent("편지 보내기 성공");
    }

    @Transactional
    public ApiResponse<?> deleteLetter(String email, Long sendLetterId) {
        Member member = memberService.findByEmail2(email);
        if (member == null) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Optional<Letter> letter = letterRepository.findBySenderAndLetterIdAndSenderDeleteFlagFalse(member, sendLetterId);
        if(letter.isEmpty()) return ApiResponse.createError(ErrorCode.LETTER_NOT_FOUND);

        letter.get().updateSenderDeleteFlag();

        return ApiResponse.createSuccessWithNoContent("보낸 편지 삭제 성공");
    }
}
