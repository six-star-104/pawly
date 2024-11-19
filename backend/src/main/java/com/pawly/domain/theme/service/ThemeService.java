package com.pawly.domain.theme.service;

import com.pawly.domain.easterEgg.entity.Status;
import com.pawly.domain.easterEgg.repository.CompleteEasterEggRepository;
import com.pawly.domain.easterEgg.repository.EasterEggRepository;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.service.MemberServiceImpl;
import com.pawly.domain.theme.dto.ThemeResponseDto;
import com.pawly.domain.theme.entity.Theme;
import com.pawly.domain.theme.repository.ThemeRepository;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ThemeService {

    private final ThemeRepository themeRepository;
    private final EasterEggRepository easterEggRepository;
    private final CompleteEasterEggRepository completeEasterEggRepository;
    private final MemberServiceImpl memberService;

    public ApiResponse<?> getTheme(String email) {
        // 회원 정보 확인
        Member member = memberService.findByEmail2(email);
        if (member == null) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        // 모든 테마 조회
        List<Theme> themes = themeRepository.findAll();
        List<ThemeResponseDto> response = new ArrayList<>();

        // 각 테마별로 처리
        for (Theme theme : themes) {
            ThemeResponseDto dto = new ThemeResponseDto(theme);

            // 배경 설정
            dto.setBackground(theme.getImage() != null ? theme.getImage() : theme.getBackgroundColor());

            // 기본 테마 여부 또는 부활절 달성 여부에 따른 flag 설정
            if (theme.getBase()) {
                dto.setFlag(true);
            } else {
                dto.setFlag(getEasterEggFlag(member.getMemberId(), theme.getThemeId()));
            }

            response.add(dto);
        }

        return ApiResponse.createSuccess(response, "테마 조회 성공");
    }

    private boolean getEasterEggFlag(Long memberId, Long themeId) {
        return easterEggRepository.findByEasterEggId(themeId)
                .flatMap(easterEggId -> completeEasterEggRepository.findByStatus(memberId, easterEggId))
                .map(status -> status.equals(Status.COMPLETE))
                .orElse(false);
    }
}
