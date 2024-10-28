package com.pawly.domain.postbox.repository;

import com.pawly.domain.postbox.entity.Postbox;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostboxRepository extends JpaRepository<Postbox, Long> {

}
