package com.pawly.domain.easterEgg.dto;

import com.pawly.domain.easterEgg.entity.CompleteEasterEgg;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EasterEggResponseDto {

    private Long easterEggId;
    private String content;
    private String reward;
    private String status;
    private LocalDateTime completedAt;

    public static EasterEggResponseDto to(CompleteEasterEgg easterEgg) {
        return EasterEggResponseDto.builder()
                .easterEggId(easterEgg.getCompleteEasterEggId())
                .content(easterEgg.getEasterEgg().getContent())
                .reward(easterEgg.getEasterEgg().getTheme().getThemeName())
                .status(easterEgg.getStatus().getMessage())
                .completedAt(easterEgg.getCompletedAt())
                .build();
    }
}
