package com.pawly.domain.letter.dto.response;

import com.pawly.domain.letter.entity.Letter;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LetterResponseDTO {

    private Long letterId;
    private Long senderId;
    private String senderName;
    private Long recipientId;
    private String recipientName;
    private String content;
    private String picture;
    private Integer reaction;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static LetterResponseDTO toDTO(Letter letter) {
        return LetterResponseDTO.builder()
            .letterId(letter.getLetterId())
            .senderId(letter.getSender().getMemberId())
            .senderName(letter.getSender().getNickname())
            .recipientId(letter.getRecipient().getMemberId())
            .recipientName(letter.getRecipient().getNickname())
            .content(letter.getContent())
            .picture(letter.getPicture())
            .reaction(letter.getReaction())
            .createdAt(letter.getCreatedAt())
            .updatedAt(letter.getUpdatedAt())
            .build();
    }
}
