package com.pawly.domain.member.dto.response;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.entity.Role;
import com.pawly.domain.member.entity.Status;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class MemberProfileResponseDTO {

    private Long memberId;
    private String email;
    private String nickname;
    private String name;
    private String provider;
    private LocalDate birth;
    private String assets;
    private String assetsName;

    public MemberProfileResponseDTO(Member member) {
        this.memberId = member.getMemberId();
        this.email = member.getEmail();
        this.nickname = member.getNickname();
        this.name = member.getName();
        this.provider = member.getProvider();
        this.birth = member.getBirth();
        this.assets = member.getAssets();
        this.assetsName = member.getAssetsName();
    }
}
