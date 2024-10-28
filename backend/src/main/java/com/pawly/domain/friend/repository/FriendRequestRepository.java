package com.pawly.domain.friend.repository;

import com.pawly.domain.friend.dto.FriendResponse;
import com.pawly.domain.friend.entity.FriendRequest;
import com.pawly.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {

    List<FriendRequest> findBySenderId(Member memberId);
    List<FriendRequest> findByReceiverId(Member memberId);
}
