package com.pawly.domain.member.service;

import com.pawly.domain.easterEgg.service.EasterEggService;
import com.pawly.domain.member.entity.Status;
import com.pawly.domain.missionStatus.service.MissionStatusService;
import com.pawly.domain.member.dto.request.SignUpRequestDTO;
import com.pawly.domain.member.dto.response.MemberProfileResponseDTO;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import com.pawly.global.service.FileService;
import jakarta.persistence.EntityNotFoundException;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final FileService fileService;
    private final EasterEggService easterEggService;
    private final MissionStatusService missionStatusService;

    @Override
    public Member findByMemberId(Long memberId) {

        return memberRepository.findById(memberId).get();
    }

    @Override
    public Member findByEmail(String email) throws Exception {

        return memberRepository.findByEmail(email).get();
    }

    public Member findByEmail2(String email) {
        return memberRepository.findByEmail(email).orElse(null);
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
        memberRepository.save(member);

        String fileUrl = fileService.saveAsset(asset);
        member.setAssets(fileUrl);

        easterEggService.initializeChallengesForNewUser(member.getMemberId());
        missionStatusService.initializeMissionStatus(member.getMemberId());

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
    public void deleteUser(Member member) {

        member.deleteMember();
    }

    @Override
    public MemberProfileResponseDTO getProfile(Long memberId)  {

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다"));

        return new MemberProfileResponseDTO(member);

    }

    // 매일 자정에 실행 (크론 표현식 "0 0 0 * * *" 사용)
    @Scheduled(cron = "0 0 0 * * *")
    public void autoUnsuspendMembers() {
        // SUSPENDED 상태인 모든 멤버를 조회
        List<Member> suspendedMembers = memberRepository.findByStatus(Status.SUSPENDED);

        for (Member member : suspendedMembers) {
            // 정지 해제 시간이 현재보다 이전이라면 정지 해제
            if (member.getSuspendedUntil() != null && LocalDateTime.now().isAfter(member.getSuspendedUntil())) {
                member.resumeMember();
                memberRepository.save(member); // 상태 변경 후 저장
            }
        }
    }
}
