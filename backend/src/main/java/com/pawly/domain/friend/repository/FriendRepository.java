package com.pawly.domain.friend.repository;

import com.pawly.domain.friend.entity.Friend;
import com.pawly.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FriendRepository extends JpaRepository<Friend, Long> {

    @Query("SELECT f FROM Friend f " +
            "WHERE (f.memberId1.memberId = :memberId OR f.memberId2.memberId = :memberId) " +
            "AND f.deleteFlag = false " +
            "ORDER BY f.updatedAt DESC")
    List<Friend> findFriendsByMemberId(@Param("memberId") Long memberId);

    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN false ELSE true END " +
            "FROM Friend f " +
            "WHERE (f.memberId1.memberId = :memberId AND f.memberId2.memberId = :memberId2 " +
            "       OR f.memberId2.memberId = :memberId AND f.memberId1.memberId = :memberId2) " +
            "AND f.deleteFlag = false")
    boolean existsByMemberAndTargetMember(@Param("memberId") Long memberId, @Param("memberId2") Long memberId2);

    @Query("SELECT f FROM Friend f " +
            "WHERE (f.memberId1.memberId = :memberId AND f.memberId2.memberId = :memberId2 " +
            "       OR f.memberId2.memberId = :memberId AND f.memberId1.memberId = :memberId2) " +
            "AND f.deleteFlag = false")
    Optional<Friend> findByMemberAndTargetMember(@Param("memberId") Long memberId, @Param("memberId2") Long memberId2);

    @Query("SELECT f FROM Friend f " +
            "WHERE (f.memberId1.memberId = :memberId AND f.memberId2.memberId = :memberId2 " +
            "       OR f.memberId2.memberId = :memberId AND f.memberId1.memberId = :memberId2) " +
            "AND f.deleteFlag = true")
    Optional<Friend> findByFriend(@Param("memberId") Long memberId, @Param("memberId2") Long memberId2);

    List<Friend> findByMemberId1OrMemberId2AndDeleteFlagIsFalse(Member member, Member member2);
}
