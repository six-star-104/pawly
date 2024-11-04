package com.pawly.domain.member.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Status {
    ACTIVATED,
    SUSPENDED,
    DEACTIVATED,
}
