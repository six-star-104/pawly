package com.pawly.domain.easterEgg.repository;

import com.pawly.domain.easterEgg.entity.EasterEgg;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EasterEggRepository extends JpaRepository<EasterEgg, Long> {
}
