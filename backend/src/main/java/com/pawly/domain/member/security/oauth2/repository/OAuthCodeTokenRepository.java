package com.pawly.domain.member.security.oauth2.repository;

import com.pawly.domain.member.security.oauth2.model.OAuthCodeToken;
import org.springframework.data.repository.CrudRepository;

public interface OAuthCodeTokenRepository extends CrudRepository<OAuthCodeToken, String> {
}
