package com.pawly.domain.letter.dto.response;

import com.pawly.domain.letter.entity.Letter;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SendLetterDetailResponseDTO {

    private Long sendLetterId;
    private Long recipientId;
    private String recipientName;
    private String content;
    private String picture;
    private Integer reaction;
    private LocalDateTime createdAt;

    public static SendLetterDetailResponseDTO toDTO(Letter letter) {
        return SendLetterDetailResponseDTO.builder()
                .sendLetterId(letter.getLetterId())
                .recipientId(letter.getRecipient().getMemberId())
                .recipientName(letter.getRecipient().getNickname())
                .content(letter.getContent())
                .picture(letter.getPicture())
                .reaction(letter.getReaction())
                .createdAt(letter.getCreatedAt())
                .build();
    }
}
