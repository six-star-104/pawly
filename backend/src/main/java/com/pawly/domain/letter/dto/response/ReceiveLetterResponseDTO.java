package com.pawly.domain.letter.dto.response;

import com.pawly.domain.letter.entity.ReceiveLetter;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReceiveLetterResponseDTO {

    private Long receiveLetterId;
    private Long senderId;
    private String senderName;
    private String content;
    private Long letterId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ReceiveLetterResponseDTO toDTO(ReceiveLetter receiveLetter) {
        return ReceiveLetterResponseDTO.builder()
            .receiveLetterId(receiveLetter.getReceiveLetterId())
            .senderId(receiveLetter.getLetter().getSender().getMemberId())
            .senderName(receiveLetter.getLetter().getSender().getNickname())
            .content(receiveLetter.getLetter().getContent())
            .letterId(receiveLetter.getLetter().getLetterId())
            .createdAt(receiveLetter.getLetter().getCreatedAt())
            .updatedAt(receiveLetter.getLetter().getUpdatedAt())
            .build();
    }
}
