package com.pawly.domain.member.service;

import com.pawly.domain.member.dto.request.SignUpRequestDTO;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.repository.MemberRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public Member findByEmail(String email) throws Exception {

        return memberRepository.findByEmail(email).get();
    }

    @Override
    @Transactional
    public void signUp(SignUpRequestDTO signUpRequestDTO) {

        Optional<Member> existingUser = memberRepository.findByEmail(signUpRequestDTO.getEmail());

        if (existingUser.isPresent()) {
            throw new IllegalStateException("이미 사용자가 존재합니다.");
        }

        Member member = signUpRequestDTO.toMemberEntity();

        memberRepository.save(member);
    }

    @Override
    public boolean checkNickname(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    @Override
    public void updateNickname(Member member, String nickname) {

        member.setNickname(nickname);
        memberRepository.save(member);
    }

    @Override
    public void deleteUser(Long userId) {

        memberRepository.deleteById(userId);
    }
}