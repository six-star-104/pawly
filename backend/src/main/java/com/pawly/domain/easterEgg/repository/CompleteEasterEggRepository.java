package com.pawly.domain.easterEgg.repository;

import com.pawly.domain.easterEgg.entity.CompleteEasterEgg;
import com.pawly.domain.easterEgg.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CompleteEasterEggRepository extends JpaRepository<CompleteEasterEgg, Long> {

    List<CompleteEasterEgg> findByMemberId(Long memberId);

    @Query("SELECT c FROM CompleteEasterEgg c " +
            "WHERE c.memberId =:memberId  AND c.easterEgg.easterEggId =:easterEggId")
    Optional<CompleteEasterEgg> findByMemberIdAndEasterEggId(@Param("memberId") Long memberId, @Param("easterEggId") Long easterEggId);

    @Query("SELECT c.status FROM CompleteEasterEgg c " +
            "WHERE c.memberId =:memberId  AND c.easterEgg.easterEggId =:easterEggId")
    Optional<Status> findByStatus(Long memberId, Long easterEggId);
}
