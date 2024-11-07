package com.pawly.domain.missionStatus.repository;

import com.pawly.domain.missionStatus.entity.MissionStatus;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MissionStatusRepository extends JpaRepository<MissionStatus, Long> {

    @Query("SELECT m.rollingPaper FROM MissionStatus m " +
            "WHERE m.memberId =:memberId ")
    Long countRolllingPaper(@Param("memberId") Long memberId);

    @Query("SELECT m.sendLetter FROM MissionStatus m " +
            "WHERE m.memberId =:memberId ")
    Long countSendLetter(@Param("memberId") Long memberId);

    @Query("SELECT m.receiveLetter FROM MissionStatus m " +
            "WHERE m.memberId =:memberId ")
    Long countReceiveLetter(@Param("memberId") Long memberId);

    @Query("SELECT m.collection FROM MissionStatus m " +
            "WHERE m.memberId =:memberId ")
    Long countCollection(@Param("memberId") Long memberId);

    MissionStatus findByMemberId(@Param("memberId") Long memberId);
}
