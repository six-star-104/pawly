package com.pawly.domain.member.security.exception;

import com.pawly.global.exception.ErrorCode;
import lombok.Getter;

@Getter
public class TokenExpiredException extends RuntimeException{

    private final ErrorCode errorCode;

    public TokenExpiredException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
