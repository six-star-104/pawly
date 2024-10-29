package com.pawly.domain.member.repository;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.entity.SocialType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findMemberByNickname(String nickname);

    Optional<Member> findByNicknameAndSocialType(String nickname, SocialType socialType);

    Optional<Member> findByIdentifierAndSocialType(String userIdentifier, SocialType socialType);

    Optional<Member> findByIdentifier(String identifier);
}
