package com.pawly.domain.friend.repository;

import com.pawly.domain.friend.entity.FriendRequest;
import com.pawly.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {

    List<FriendRequest> findBySenderId(Member memberId);
    List<FriendRequest> findByReceiverId(Member memberId);

    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN false ELSE true END " +
            "FROM FriendRequest f " +
            "WHERE f.senderId.id = :memberId AND f.receiverId.id = :memberId2")
    boolean existsRequest(@Param("memberId") Long memberId, @Param("memberId2") Long memberId2);

    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN false ELSE true END " +
            "FROM FriendRequest f " +
            "WHERE f.receiverId.id = :memberId AND f.senderId.id = :memberId2")
    boolean existsResponse(@Param("memberId") Long memberId, @Param("memberId2") Long memberId2);
}
