package com.pawly.domain.letter.dto.response;

import com.pawly.domain.letter.entity.ReceiveLetter;
import com.pawly.domain.letter.entity.SendLetter;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SendLetterResponseDTO {

    private Long receiveLetterId;
    private Long recipientId;
    private String recipientName;
    private Long letterId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static SendLetterResponseDTO toDTO(SendLetter sendLetter) {
        return SendLetterResponseDTO.builder()
            .receiveLetterId(sendLetter.getSendLetterId())
            .recipientId(sendLetter.getLetter().getRecipient().getMemberId())
            .recipientName(sendLetter.getLetter().getRecipient().getNickname())
            .letterId(sendLetter.getLetter().getLetterId())
            .createdAt(sendLetter.getLetter().getCreatedAt())
            .updatedAt(sendLetter.getLetter().getUpdatedAt())
            .build();
    }
}
