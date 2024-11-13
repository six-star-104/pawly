package com.pawly.domain.theme.repository;

import com.pawly.domain.theme.entity.Theme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ThemeRepository extends JpaRepository<Theme, Long> {

    @Query("SELECT t FROM Theme t " +
            "WHERE t.themeName =:themeName " )
    Optional<Theme> findByThemeName(String themeName);
}
