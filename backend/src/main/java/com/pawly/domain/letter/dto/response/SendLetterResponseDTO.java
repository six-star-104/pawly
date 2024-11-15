package com.pawly.domain.letter.dto.response;

import com.pawly.domain.letter.entity.Letter;
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
    private LocalDateTime createdAt;

    public static SendLetterResponseDTO toDTO(Letter sendLetter) {
        return SendLetterResponseDTO.builder()
            .sendLetterId(sendLetter.getLetterId())
            .recipientId(sendLetter.getRecipient().getMemberId())
            .recipientName(sendLetter.getRecipient().getNickname())
            .content(sendLetter.getContent())
            .reaction(sendLetter.getReaction())
            .createdAt(sendLetter.getCreatedAt())
            .build();
    }
}
