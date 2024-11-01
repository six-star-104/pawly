package com.pawly.domain.letter.repository;

import com.pawly.domain.letter.entity.SendLetter;
import com.pawly.domain.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SendLetterRepository extends JpaRepository<SendLetter, Long> {

    Page<SendLetter> findByMemberAndDeleteFlagFalse(Member member, Pageable pageable);

    SendLetter findByMemberAndSendLetterIdAndDeleteFlagFalse(Member member, Long sendLetterId);
}
