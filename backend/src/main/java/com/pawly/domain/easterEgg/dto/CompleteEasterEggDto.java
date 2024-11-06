package com.pawly.domain.easterEgg.dto;

import com.pawly.domain.easterEgg.entity.EasterEgg;
import com.pawly.domain.easterEgg.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CompleteEasterEggDto {

    private Long memberId;
    private EasterEgg easterEgg;
    private Status status;
}
