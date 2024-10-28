package com.pawly.domain.member.service;

import com.pawly.domain.member.dto.request.SignUpRequestDTO;
import com.pawly.domain.member.entity.Member;

public interface MemberService {
    Member findByEmail(String email) throws Exception;

    void signUp(SignUpRequestDTO signUpRequestDTO);

    boolean checkNickname(String nickname);

    void updateNickname(Member user, String nickname);

    void deleteUser(Long userId);

}
