package com.pawly.domain.member.repository;

import com.pawly.domain.member.entity.Member;

import com.pawly.domain.member.entity.Status;
import java.util.List;
import java.util.Optional;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByNickname(String nickname);

    Optional<Member> findByEmail(String email);

    boolean existsByNickname(String nickname);

    List<Member> findByStatus(Status status);

    @Query(value = "SELECT * FROM Member m WHERE DATE_FORMAT(m.birth, '%m-%d') = DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 4 DAY), '%m-%d')", nativeQuery = true)
    List<Member> findByBirthInThreeDays();

    @Query("SELECT m FROM Member m " +
            "WHERE m.nickname LIKE CONCAT(:nickname, '%') " +
            "OR m.nickname LIKE CONCAT('%', :nickname) " +
            "OR m.nickname LIKE CONCAT('%', :nickname, '%') " +
            "OR m.name LIKE CONCAT(:nickname, '%') " +
            "OR m.name LIKE CONCAT('%', :nickname) " +
            "OR m.name LIKE CONCAT('%', :nickname, '%') " +
            "AND m.memberId <> :excludeId")
    List<Member> findByNicknameContainingAndExcludeSelf(@Param("nickname") String nickname, @Param("excludeId") Long excludeId);

    @Query("SELECT m.fcmToken FROM Member m " +
            "WHERE m.memberId = :memberId")
    String findFcmTokenByMemberId(@Param("memberId") Long memberId);
}
