package com.pawly.domain.member.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class UpdateNicknameRequestDTO {

    @NotNull(message = "닉네임을 입력해주세요")
    @Pattern(
        regexp = "^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9\\s]{2,8}$",
        message = "닉네임은 2~8자 사이의 한글, 영문(대소문자 구분 없음), 숫자만 허용되며, 중복된 문자는 사용할 수 없습니다."
    )
    private String nickname;
}

