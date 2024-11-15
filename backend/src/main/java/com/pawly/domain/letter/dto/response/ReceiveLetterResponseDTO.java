package com.pawly.domain.letter.dto.response;

import com.pawly.domain.letter.entity.Letter;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReceiveLetterResponseDTO {

    private Long receiveLetterId;
    private String senderName;
    private String content;
    private Integer reaction;
    private LocalDateTime createdAt;

    public static ReceiveLetterResponseDTO toDTO(Letter letter) {
        return ReceiveLetterResponseDTO.builder()
            .receiveLetterId(letter.getLetterId())
            .senderName(letter.getSender().getNickname())
            .reaction(letter.getReaction())
            .content(letter.getContent())
            .createdAt(letter.getCreatedAt())
            .build();
    }
}
