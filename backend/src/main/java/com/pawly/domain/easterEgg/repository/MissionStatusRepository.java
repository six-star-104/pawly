package com.pawly.domain.easterEgg.repository;

import com.pawly.domain.easterEgg.entity.MissionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MissionStatusRepository extends JpaRepository<MissionStatus, Long> {
}
