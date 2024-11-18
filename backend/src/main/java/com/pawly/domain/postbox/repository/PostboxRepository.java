package com.pawly.domain.postbox.repository;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.postbox.entity.Postbox;
import com.pawly.domain.rollingPaper.entity.RollingPaper;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PostboxRepository extends JpaRepository<Postbox, Long> {
    @Query(value = "SELECT p " +
            "FROM Postbox p " +
            "JOIN FETCH p.member " +
            "WHERE " +
            "(6371000 * acos(cos(radians(:latitude)) * cos(radians(p.latitude)) * " +
            "cos(radians(p.longitude) - radians(:longitude)) + sin(radians(:latitude)) * " +
            "sin(radians(p.latitude)))) <= :radius " +
            "AND p.status = 'USE'")
    List<Postbox> findPostboxesWithinRadius(@Param("latitude") Double latitude,
                                            @Param("longitude") Double longitude,
                                            @Param("radius") Double radius);

    @Query(value = "SELECT p " +
            "FROM Postbox p " +
            "JOIN FETCH p.member " +
            "WHERE " +
            "(6371000 * acos(cos(radians(:latitude)) * cos(radians(p.latitude)) * " +
            "cos(radians(p.longitude) - radians(:longitude)) + sin(radians(:latitude)) * " +
            "sin(radians(p.latitude)))) <= :radius " +
            "AND p.member =:member " +
            "AND p.status = 'USE'")
    List<Postbox> findPostboxesByMemberWithinRadius(@Param("member") Member member,
                                                    @Param("latitude") Double latitude,
                                                    @Param("longitude") Double longitude,
                                                    @Param("radius") Double radius);

    Optional<Postbox> findByRollingpaper(RollingPaper rollingPaper);
}
