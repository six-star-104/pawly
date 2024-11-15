package com.pawly.domain.letter.repository;

import com.pawly.domain.letter.entity.Letter;
import com.pawly.domain.member.entity.Member;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LetterRepository extends JpaRepository<Letter, Long> {

    // 받은 편지
    Page<Letter> findByRecipientAndRecipientDeleteFlagFalse(Member member, Pageable pageable);
    Optional<Letter> findByRecipientAndLetterIdAndRecipientDeleteFlagFalse(Member member, Long letterId);

    // 보낸 편지
    Page<Letter> findBySenderAndSenderDeleteFlagFalse(Member member, Pageable pageable);
    Optional<Letter> findBySenderAndLetterIdAndSenderDeleteFlagFalse(Member member, Long letterId);
}
