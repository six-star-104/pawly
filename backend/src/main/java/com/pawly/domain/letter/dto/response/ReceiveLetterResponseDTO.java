package com.pawly.domain.letter.dto.response;

import com.pawly.domain.letter.entity.Letter;
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
    private Long letterId;
    private String content;
    private String picture;
    private String reaction;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ReceiveLetterResponseDTO toDTO(ReceiveLetter receiveLetter) {
        return ReceiveLetterResponseDTO.builder()
            .receiveLetterId(receiveLetter.getReceiveLetterId())
            .senderId(receiveLetter.getLetter().getSender().getMemberId())
            .senderName(receiveLetter.getLetter().getSender().getNickname())
            .letterId(receiveLetter.getLetter().getLetterId())
            .content(receiveLetter.getLetter().getContent())
            .picture(receiveLetter.getLetter().getPicture())
            .reaction(receiveLetter.getLetter().getReaction())
            .createdAt(receiveLetter.getLetter().getCreatedAt())
            .updatedAt(receiveLetter.getLetter().getUpdatedAt())
            .build();
    }
}
