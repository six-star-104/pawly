package com.pawly.domain.letter.service;

import com.pawly.domain.letter.dto.response.ReceiveLetterResponseDTO;
import com.pawly.domain.letter.entity.ReceiveLetter;
import com.pawly.domain.letter.repository.LetterRepository;
import com.pawly.domain.letter.repository.ReceiveLetterRepository;
import com.pawly.domain.member.entity.Member;
import com.pawly.global.dto.PageResponseDTO;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReceiveLetterService {

    private final LetterRepository letterRepository;
    private final ReceiveLetterRepository receiveLetterRepository;

    public PageResponseDTO getReceiveLetters(Member member, int pageNumber, int pageSize, String sortType, String sortBy) {

        Sort sort = sortType.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending()
            : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Page<ReceiveLetter> receiveLetters = receiveLetterRepository.findByMemberAndDeleteFlagFalse(member, pageable);

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
}
