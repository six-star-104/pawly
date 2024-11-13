package com.pawly.domain.theme.service;

import com.pawly.domain.easterEgg.repository.CompleteEasterEggRepository;
import com.pawly.domain.easterEgg.repository.EasterEggRepository;
import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.entity.Role;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.domain.member.service.MemberService;
import com.pawly.domain.theme.dto.ThemeAdminReadDto;
import com.pawly.domain.theme.dto.ThemeCreateDto;
import com.pawly.domain.theme.dto.ThemeUpdateDto;
import com.pawly.domain.theme.entity.Theme;
import com.pawly.domain.theme.repository.ThemeRepository;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ThemeAdminService {

    private final ThemeRepository themeRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public ApiResponse<?> createTheme(ThemeCreateDto dto){
        Optional<Member> member = memberRepository.findByEmail(dto.getMemberName());
        if (member.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Member m = member.get();

        if (m.getRole() != Role.ADMIN) return ApiResponse.createError(ErrorCode.NOT_ADMIN_FAILED);

        Optional<Theme> theme = themeRepository.findByThemeName(dto.getThemeName());
        if (!theme.isEmpty()) return ApiResponse.createError(ErrorCode.THEME_NAME_OVERLAP);

        themeRepository.save(dto.toEntity());
        return ApiResponse.createSuccessWithNoContent("테마 생성 완료");
    }

    @Transactional
    public ApiResponse<?> updateTheme(ThemeUpdateDto dto){
        Optional<Member> member = memberRepository.findByEmail(dto.getMemberName());
        if (member.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Member m = member.get();

        if (m.getRole() != Role.ADMIN) return ApiResponse.createError(ErrorCode.NOT_ADMIN_FAILED);

        Optional<Theme> theme = themeRepository.findById(dto.getThemeId());
        if (theme.isEmpty()) return ApiResponse.createError(ErrorCode.THEME_NOT_FOUND);

        theme.get().updateTheme(dto);
        return ApiResponse.createSuccessWithNoContent("테마 수정 성공");
    }

    @Transactional
    public ApiResponse<?> deleteTheme(String memberName ,Long themeId){
        Optional<Member> member = memberRepository.findByEmail(memberName);
        if (member.isEmpty()) return ApiResponse.createError(ErrorCode.USER_NOT_FOUND);

        Member m = member.get();

        if (m.getRole() != Role.ADMIN) return ApiResponse.createError(ErrorCode.NOT_ADMIN_FAILED);

        Optional<Theme> theme = themeRepository.findById(themeId);
        if (theme.isEmpty()) return ApiResponse.createError(ErrorCode.THEME_NOT_FOUND);

        theme.get().deleteTheme();
        return ApiResponse.createSuccessWithNoContent("테마 삭제 성공");
    }

    @Transactional
    public ApiResponse<?> readTheme(String name) {
        Optional<Member> member = memberRepository.findByEmail(name);
        if (member.isEmpty()) return ApiResponse.createError(ErrorCode.THEME_NOT_FOUND);

        Member m = member.get();

        if (!m.getRole().equals(Role.ADMIN)) return ApiResponse.createError(ErrorCode.ACCESS_DENIED);

        List<Theme> themeList = themeRepository.findAll();
        List<ThemeAdminReadDto> themeAdminReadDtos = themeList.stream()
                .map(ThemeAdminReadDto::of)
                .toList();

        return ApiResponse.createSuccess(themeAdminReadDtos,"테마 조회 성공");
    }
}
