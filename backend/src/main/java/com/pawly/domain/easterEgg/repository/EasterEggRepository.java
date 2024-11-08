package com.pawly.domain.easterEgg.repository;

import com.pawly.domain.easterEgg.entity.EasterEgg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface EasterEggRepository extends JpaRepository<EasterEgg, Long> {

    @Query("SELECT e.easterEggId FROM EasterEgg e " +
            "WHERE e.theme.themeId =:themeId")
    Optional<Long> findByEasterEggId(Long themeId);
}
