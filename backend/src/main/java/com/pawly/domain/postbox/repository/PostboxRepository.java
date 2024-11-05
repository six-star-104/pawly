package com.pawly.domain.postbox.repository;

import com.pawly.domain.postbox.entity.Postbox;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostboxRepository extends JpaRepository<Postbox, Long> {
    @Query(value = "SELECT p FROM Postbox p WHERE " +
            "(6371000 * acos(cos(radians(:latitude)) * cos(radians(p.latitude)) * " +
            "cos(radians(p.longitude) - radians(:longitude)) + sin(radians(:latitude)) * " +
            "sin(radians(p.latitude)))) <= :radius " +
            "AND p.status = 'USE'")
    List<Postbox> findPostboxesWithinRadius(@Param("latitude") Double latitude,
                                            @Param("longitude") Double longitude,
                                            @Param("radius") Double radius);
}
