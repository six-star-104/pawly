package com.pawly.domain.letter.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LetterRequestDTO {

    private Long recipientId;
    private String content;
    private String picture;
}
