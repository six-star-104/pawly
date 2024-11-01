package com.pawly.domain.letter.repository;

import com.pawly.domain.letter.entity.ReceiveLetter;
import com.pawly.domain.member.entity.Member;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceiveLetterRepository extends JpaRepository<ReceiveLetter, Long> {

    Page<ReceiveLetter> findByMemberAndDeleteFlagFalse(Member member, Pageable pageable);
}
