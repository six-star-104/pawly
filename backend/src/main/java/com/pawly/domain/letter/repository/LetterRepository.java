package com.pawly.domain.letter.repository;

import com.pawly.domain.letter.entity.Letter;
import com.pawly.domain.member.entity.Member;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LetterRepository extends JpaRepository<Letter, Long> {
    List<Letter> findBySender(Member member);

    Page<Letter> findByRecipient(Member member, Pageable pageable);

    Letter findBySenderAndLetterId(Member member, Long letterId);

    Letter findByRecipientAndLetterId(Member member, Long letterId);
}
