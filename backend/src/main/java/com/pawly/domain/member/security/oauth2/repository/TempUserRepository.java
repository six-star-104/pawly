package com.pawly.domain.member.security.oauth2.repository;

import com.pawly.domain.member.security.oauth2.model.TempUser;
import org.springframework.data.repository.CrudRepository;

public interface TempUserRepository extends CrudRepository<TempUser, String> {
}

