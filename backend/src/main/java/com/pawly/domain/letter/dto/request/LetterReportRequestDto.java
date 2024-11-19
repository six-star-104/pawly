package com.pawly.domain.letter.dto.request;

import com.pawly.domain.postIt.dto.PostReportCreateDto;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LetterReportRequestDto {

    @NotNull
    private String content;

}
