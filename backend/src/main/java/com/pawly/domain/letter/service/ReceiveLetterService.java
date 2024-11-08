package com.pawly.domain.letter.service;

import com.pawly.domain.letter.dto.request.LetterReactionRequestDTO;
import com.pawly.domain.letter.dto.response.LetterResponseDTO;
import com.pawly.domain.letter.dto.response.ReceiveLetterResponseDTO;
import com.pawly.domain.letter.entity.Letter;
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
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
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

    public LetterResponseDTO getLetter(Member member, Long receiveLetterId) {

        ReceiveLetter receiveLetter = receiveLetterRepository.findByMemberAndReceiveLetterIdAndDeleteFlagFalse(member, receiveLetterId);

        Letter letter = letterRepository.findByRecipientAndLetterId(member, receiveLetter.getLetter().getLetterId());

        return LetterResponseDTO.toDTO(letter);
    }

    @Transactional
    public void deleteLetter(Member member, Long receiveLetterId) {

        ReceiveLetter receiveLetter = receiveLetterRepository.findByMemberAndReceiveLetterIdAndDeleteFlagFalse(member, receiveLetterId);

        receiveLetter.deleteLetter(receiveLetter);
    }

    @Transactional
    public void addReaction(Member member, LetterReactionRequestDTO letterReactionRequestDTO, Long receiveLetterId) {
        ReceiveLetter receiveLetter = receiveLetterRepository.findByMemberAndReceiveLetterIdAndDeleteFlagFalse(member, receiveLetterId);

        Letter letter = letterRepository.findByRecipientAndLetterId(member, receiveLetter.getLetter().getLetterId());

        letter.setReaction(letterReactionRequestDTO.getReaction());
    }
}