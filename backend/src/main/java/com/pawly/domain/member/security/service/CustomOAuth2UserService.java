package com.pawly.domain.member.security.service;

import com.pawly.domain.member.entity.Member;
import com.pawly.domain.member.repository.MemberRepository;
import com.pawly.domain.member.security.jwt.JwtTokenProvider;
import com.pawly.domain.member.security.oauth2.model.OAuthAttributes;
import com.pawly.domain.member.security.oauth2.model.TempUser;
import com.pawly.domain.member.security.oauth2.repository.TempUserRepository;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final JwtTokenProvider jwtTokenProvider;
    private final TempUserRepository tempUserRepository;
    private final MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        log.info("loadUser : {}", oAuth2User);
        //oauth2 로그인 구분하기 위한 key
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration()
            .getProviderDetails()
            .getUserInfoEndpoint()
            .getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        Member member = memberRepository.findByEmail(attributes.getEmail()).orElse(null);

        if(member == null) {
            String tempToken = jwtTokenProvider.generateOAuthSignUpToken(attributes.getEmail(), attributes.getName());
            log.info("여기까지 일단 오나");

            TempUser tempUser = TempUser.builder()
                .token(tempToken)
                .email(attributes.getEmail())
                .name(attributes.getName())
                .provider(registrationId)
                .providerId(attributes.getProviderId())
                .build();
            tempUserRepository.save(tempUser);
            Map<String, Object> tempAttributes = new HashMap<>();
            tempAttributes.put("tempToken", tempToken);

            return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_TEMP")),
                tempAttributes,
                "tempToken");
        } else {
            if (!registrationId.equals(member.getProvider()) || !attributes.getProviderId().equals(
                member.getProviderId())) {
                member.updateOAuthInfo(attributes.getProviderId(), registrationId);
                member = memberRepository.save(member);
            }

            return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                attributes.getAttributes(),
                attributes.getNameAttributeKey());
        }

    }
}
