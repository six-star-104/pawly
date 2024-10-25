package com.pawly.domain.member.service;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    public Member findByIdentifier(String identifier) {

        return memberRepository.findByIdentifier(identifier).orElse(null);
    }
}
