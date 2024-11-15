package com.pawly.domain.letter.service;

import com.pawly.domain.letter.dto.request.LetterReactionRequestDTO;
import com.pawly.domain.letter.dto.request.LetterReportRequestDto;
import com.pawly.domain.letter.dto.response.ReceiveLetterDetailResponseDto;
import com.pawly.domain.letter.dto.response.ReceiveLetterResponseDTO;
import com.pawly.domain.letter.entity.Letter;
import com.pawly.domain.letter.repository.LetterRepository;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.domain.member.service.MemberServiceImpl;
import com.pawly.domain.report.entity.Report;
import com.pawly.domain.report.enums.Category;
import com.pawly.domain.report.enums.Status;
import com.pawly.domain.report.repository.ReportRepository;
import com.pawly.global.dto.PageResponseDTO;
import java.util.List;
import java.util.Optional;

import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReceiveLetterService {

    private final MemberServiceImpl memberService;
    private final LetterRepository letterRepository;
    private final MemberRepository memberRepository;
    private final ReportRepository reportRepository;

    public PageResponseDTO getReceiveLetters(Member member, int pageNumber, int pageSize, String sortType, String sortBy) {

        Sort sort = sortType.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending()
            : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Page<Letter> receiveLetters = letterRepository.findByRecipientAndRecipientDeleteFlagFalse(member, pageable);

        List<ReceiveLetterResponseDTO> receiveLetterResponseDTOS = receiveLetters.stream()
            .map(ReceiveLetterResponseDTO::toDTO)
            .toList();

        return PageResponseDTO.builder()
            .content(receiveLetterResponseDTOS)
            .pageSize(pageSize)
            .pageNumber(pageNumber)
            .totalElements(receiveLetters.getTotalElements())
            .totalPage((long) Math.ceil((double) receiveLetters.getTotalElements() / pageSize))
            .build();
    }

    public ApiResponse<?> getLetter(String email, Long receiveLetterId) {
        Member member = memberService.findByEmail2(email);
        if (member == null) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Optional<Letter> letter = letterRepository.findByRecipientAndLetterIdAndRecipientDeleteFlagFalse(member, receiveLetterId);
        if(letter.isEmpty()) return ApiResponse.createError(ErrorCode.LETTER_NOT_FOUND);
        return ApiResponse.createSuccess(ReceiveLetterDetailResponseDto.toDTO(letter.get()), "받은 편지 상세 조회 성공");
    }

    @Transactional
    public ApiResponse<?> deleteLetter(String email, Long receiveLetterId) {
        Member member = memberService.findByEmail2(email);
        if (member == null) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Optional<Letter> letter = letterRepository.findByRecipientAndLetterIdAndRecipientDeleteFlagFalse(member, receiveLetterId);
        if(letter.isEmpty()) return ApiResponse.createError(ErrorCode.LETTER_NOT_FOUND);

        letter.get().updateRecipientDeleteFlag();
        return ApiResponse.createSuccessWithNoContent("받은 편지 삭제 성공");
    }

    @Transactional
    public ApiResponse<?> addReaction(String email, LetterReactionRequestDTO letterReactionRequestDTO, Long receiveLetterId) {
        Member member = memberService.findByEmail2(email);
        if (member == null) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Optional<Letter> letter = letterRepository.findByRecipientAndLetterIdAndRecipientDeleteFlagFalse(member, receiveLetterId);
        if(letter.isEmpty()) return ApiResponse.createError(ErrorCode.LETTER_NOT_FOUND);

        letter.get().setReaction(letterReactionRequestDTO.getReaction());

        return ApiResponse.createSuccessWithNoContent("받은 편지함 반응 보내기 성공");
    }

    @Transactional
    public ApiResponse<?> letterReport(String memberName, Long receiveLetterId, LetterReportRequestDto dto) {
        Optional<Member> member = memberRepository.findByEmail(memberName);
        if (member.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Member m = member.get();

        Optional<Letter> letter = letterRepository.findById(receiveLetterId);
        if (letter.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Letter l = letter.get();

        if (!m.equals(l.getRecipient())) return ApiResponse.createError(ErrorCode.ACCESS_DENIED);

        // 이미 신고 완료
        Optional<Report> optionalReport = reportRepository.findByMemberAndCategoryAndDetailId(m, Category.LETTER, receiveLetterId);
        if(optionalReport.isPresent()) return ApiResponse.createError(ErrorCode.ALREADY_REPORT);

        reportRepository.save(Report.builder()
                        .member(m)
                        .member2(l.getSender())
                        .category(Category.LETTER)
                        .detailId(receiveLetterId)
                        .content(dto.getContent())
                        .status(Status.STANDBY)
                        .build());

        return ApiResponse.createSuccessWithNoContent("편지 신고 성공");
    }
}
