package com.pawly.domain.member.security.repository;

import com.pawly.domain.member.security.entity.RefreshToken;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {

    List<RefreshToken> findAllByUserEmail(String userEmail);

}

