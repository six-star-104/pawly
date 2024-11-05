package com.pawly.domain.easterEgg.repository;

import com.pawly.domain.easterEgg.entity.CompleteEasterEgg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CompleteEasterEggRepository extends JpaRepository<CompleteEasterEgg, Long> {

    List<CompleteEasterEgg> findByMemberId(Long memberId);

    @Query("SELECT c FROM CompleteEasterEgg c " +
            "WHERE c.memberId =:memberId  AND c.easterEgg.easterEggId =:easterEggId")
    Optional<CompleteEasterEgg> findByMemberIdAndCompleteEasterEggId(@Param("memberId") Long memberId, @Param("easterEggId") Long easterEggId);
}
