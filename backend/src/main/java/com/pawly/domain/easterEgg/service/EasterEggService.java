package com.pawly.domain.easterEgg.service;

import com.pawly.domain.easterEgg.repository.CompleteEasterEggRepository;
import com.pawly.domain.easterEgg.repository.EasterEggRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EasterEggService {

    private final EasterEggRepository easterEggRepository;
    private final CompleteEasterEggRepository completeEasterEggRepository;
}
