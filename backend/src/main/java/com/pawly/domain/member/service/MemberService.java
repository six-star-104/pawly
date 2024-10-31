package com.pawly.domain.member.service;

import com.pawly.domain.member.dto.request.SignUpRequestDTO;
import com.pawly.domain.member.dto.response.MemberProfileResponseDTO;
import com.pawly.domain.member.entity.Member;

public interface MemberService {

    Member findByMemberId(Long memberId);

    Member findByEmail(String email) throws Exception;

    void signUp(SignUpRequestDTO signUpRequestDTO);

    boolean checkNickname(String nickname);

    void updateNickname(Member member, String nickname);

    void updateBirth(Member member, String birth);

    void deleteUser(Long memberId);

    MemberProfileResponseDTO getProfile(Long memberId) throws Exception;
}
