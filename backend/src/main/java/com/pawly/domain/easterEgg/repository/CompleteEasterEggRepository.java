package com.pawly.domain.easterEgg.repository;

import com.pawly.domain.easterEgg.entity.CompleteEasterEgg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompleteEasterEggRepository extends JpaRepository<CompleteEasterEgg, Long> {

    List<CompleteEasterEgg> findByMemberId(Long memberId);

}
