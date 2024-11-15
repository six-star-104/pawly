package com.pawly.domain.letter.dto.response;

import com.pawly.domain.letter.entity.SendLetter;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SendLetterResponseDTO {

    private Long sendLetterId;
    private Long recipientId;
    private String recipientName;
    private String content;
    private Integer reaction;
    private Long letterId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static SendLetterResponseDTO toDTO(SendLetter sendLetter) {
        return SendLetterResponseDTO.builder()
            .sendLetterId(sendLetter.getSendLetterId())
            .recipientId(sendLetter.getLetter().getRecipient().getMemberId())
            .recipientName(sendLetter.getLetter().getRecipient().getNickname())
            .content(sendLetter.getLetter().getContent())
            .reaction(sendLetter.getLetter().getReaction())
            .letterId(sendLetter.getLetter().getLetterId())
            .createdAt(sendLetter.getLetter().getCreatedAt())
            .updatedAt(sendLetter.getLetter().getUpdatedAt())
            .build();
    }
}
