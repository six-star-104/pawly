package com.pawly.domain.letter.service;

import com.pawly.domain.letter.dto.request.LetterRequestDTO;
import com.pawly.domain.letter.dto.response.LetterResponseDTO;
import com.pawly.domain.letter.dto.response.SendLetterResponseDTO;
import com.pawly.domain.letter.entity.Letter;
import com.pawly.domain.letter.entity.ReceiveLetter;
import com.pawly.domain.letter.entity.SendLetter;
import com.pawly.domain.letter.repository.LetterRepository;
import com.pawly.domain.letter.repository.ReceiveLetterRepository;
import com.pawly.domain.letter.repository.SendLetterRepository;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.repository.MemberRepository;
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
public class SendLetterService {

    private final LetterRepository letterRepository;
    private final SendLetterRepository sendLetterRepository;
    private final ReceiveLetterRepository receiveLetterRepository;
    private final MemberRepository memberRepository;

    public PageResponseDTO getSendLetters(Member member, int pageNumber, int pageSize, String sortType, String sortBy) {

        Sort sort = sortType.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending()
            : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Page<SendLetter> sendLetters = sendLetterRepository.findByMemberAndDeleteFlagFalse(member, pageable);

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

    public LetterResponseDTO getLetter(Member member, Long sendLetterId) {

        SendLetter sendLetter = sendLetterRepository.findByMemberAndSendLetterIdAndDeleteFlagFalse(member, sendLetterId);

        Letter letter = letterRepository.findBySenderAndLetterId(member, sendLetter.getLetter().getLetterId());

        return LetterResponseDTO.toDTO(letter);
    }

    @Transactional
    public void sendLetter(Member member, LetterRequestDTO letterRequestDTO) {

        Member recipient = memberRepository.getReferenceById(letterRequestDTO.getRecipientId());

        Letter letter = Letter.builder()
            .sender(member)
            .recipient(recipient)
            .content(letterRequestDTO.getContent())
            .picture(letterRequestDTO.getPicture())
            .build();

        letterRepository.save(letter);

        SendLetter sendLetter = SendLetter.builder()
            .member(member)
            .letter(letter)
            .build();

        sendLetterRepository.save(sendLetter);

        ReceiveLetter receiveLetter = ReceiveLetter.builder()
            .member(recipient)
            .letter(letter)
            .build();

        receiveLetterRepository.save(receiveLetter);
    }

    @Transactional
    public void deleteLetter(Member member, Long sendLetterId) {

        SendLetter sendLetter = sendLetterRepository.findByMemberAndSendLetterIdAndDeleteFlagFalse(member, sendLetterId);

        sendLetter.deleteLetter(sendLetter);
    }
}
