package com.pawly.domain.easterEgg.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Status {

    COMPLETE("완료됨"),
    ACHIEVED("완료하기");

    private final String message;
}