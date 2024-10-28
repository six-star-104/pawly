package com.pawly.domain.friend.repository;

import com.pawly.domain.friend.entity.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend, Long> {

    @Query("SELECT f FROM Friend f " +
            "WHERE (f.memberId1.id = :memberId OR f.memberId2.id = :memberId) " +
            "AND f.deleteFlag = false " +
            "ORDER BY f.friendId DESC")
    List<Friend> findFriendsByMemberId(@Param("memberId") Long memberId);
}
