package com.pawly.domain.easterEgg.dto;

import com.pawly.domain.easterEgg.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CompleteEasterEggDto {

    private Long memberId;
    private Long easterEggId;
    private Status status;
}
