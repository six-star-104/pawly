package com.pawly.domain.member.dto.request;

import com.pawly.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SignUpRequestDTO {


    private String name;
    private String email;
    private String nickname;
    private String provider;
    private String providerId;
    private String assets;
    private String assetsName;

    public Member toMemberEntity() {
        return Member.builder()
            .name(this.name)
            .email(this.email)
            .nickname(this.nickname)
            .provider(this.provider)
            .providerId(this.providerId)
            .assets(this.assets)
            .build();
    }

}
