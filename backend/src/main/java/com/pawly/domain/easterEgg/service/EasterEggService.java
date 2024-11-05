package com.pawly.domain.easterEgg.service;

import com.pawly.domain.easterEgg.dto.CompleteEasterEggDto;
import com.pawly.domain.easterEgg.entity.CompleteEasterEgg;
import com.pawly.domain.easterEgg.entity.EasterEgg;
import com.pawly.domain.easterEgg.entity.Status;
import com.pawly.domain.easterEgg.repository.CompleteEasterEggRepository;
import com.pawly.domain.easterEgg.repository.EasterEggRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EasterEggService {

    private final EasterEggRepository easterEggRepository;
    private final CompleteEasterEggRepository completeEasterEggRepository;

    public void initializeChallengesForNewUser(Long memberId) {
        List<EasterEgg> easterEggs = easterEggRepository.findAll();

        for (EasterEgg easterEgg : easterEggs) {
            CompleteEasterEggDto dto = new CompleteEasterEggDto(memberId, easterEgg.getEasterEggId(), Status.IN_PROGRESS);
            CompleteEasterEgg challenge = new CompleteEasterEgg(dto);

            completeEasterEggRepository.save(challenge);
        }
    }
}
