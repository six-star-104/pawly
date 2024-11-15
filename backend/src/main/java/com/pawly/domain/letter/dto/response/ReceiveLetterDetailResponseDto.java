package com.pawly.domain.letter.dto.response;

import com.pawly.domain.letter.entity.Letter;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReceiveLetterDetailResponseDto {

    private Long receiveLetterId;
    private Long senderId;
    private String senderName;
    private String recipientName;
    private String content;
    private String picture;
    private Integer reaction;
    private LocalDateTime createdAt;

    public static ReceiveLetterDetailResponseDto toDTO(Letter letter) {
        return ReceiveLetterDetailResponseDto.builder()
                .receiveLetterId(letter.getLetterId())
                .senderId(letter.getSender().getMemberId())
                .senderName(letter.getSender().getNickname())
                .recipientName(letter.getRecipient().getNickname())
                .content(letter.getContent())
                .picture(letter.getPicture())
                .reaction(letter.getReaction())
                .createdAt(letter.getCreatedAt())
                .build();
    }
}
