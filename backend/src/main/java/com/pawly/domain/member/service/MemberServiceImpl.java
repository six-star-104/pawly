package com.pawly.domain.member.service;

import com.pawly.domain.member.dto.request.SignUpRequestDTO;
import com.pawly.domain.member.dto.response.MemberProfileResponseDTO;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.entity.Role;
import com.pawly.domain.member.entity.Status;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import com.pawly.global.service.FileService;
import jakarta.persistence.EntityNotFoundException;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final FileService fileService;

    @Override
    public Member findByMemberId(Long memberId) {

        return memberRepository.findById(memberId).get();
    }

    @Override
    public Member findByEmail(String email) throws Exception {

        return memberRepository.findByEmail(email).get();
    }

    @Override
    @Transactional
    public ApiResponse<?> signUp(MultipartFile asset, SignUpRequestDTO signUpRequestDTO) throws IOException {

        Optional<Member> existingUser = memberRepository.findByEmail(signUpRequestDTO.getEmail());

        if (existingUser.isPresent()) {
            return ApiResponse.createError(ErrorCode.USER_REGISTER_FAILED);
        }

        if(asset.isEmpty()) {
            return ApiResponse.createError(ErrorCode.FILE_UPLOAD_FAILED);
        }

        Member member = signUpRequestDTO.toMemberEntity();

        String fileUrl = fileService.saveAsset(asset);
        member.setAssets(fileUrl);
        member.setRole(Role.USER);
        member.setStatus(Status.ACTIVATED);

        memberRepository.save(member);

        return ApiResponse.createSuccessWithNoContent("회원가입 성공");
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
    public void updateBirth(Member member, String birth) {

        member.setBirth(LocalDate.parse(birth));
        memberRepository.save(member);
    }

    @Override
    public void deleteUser(Long memberId) {

        memberRepository.deleteById(memberId);
    }

    @Override
    public MemberProfileResponseDTO getProfile(Long memberId)  {

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다"));

        return new MemberProfileResponseDTO(member);

    }
}
