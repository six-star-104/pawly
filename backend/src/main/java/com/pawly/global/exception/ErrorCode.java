package com.pawly.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    // Internal Server Error
    INTERNAL_SERVER_ERROR("C001", HttpStatus.INTERNAL_SERVER_ERROR, "서버에 오류가 발생했습니다."),

    // User Error
    USER_REGISTER_FAILED("U001", HttpStatus.BAD_REQUEST, "사용자 등록에 실패했습니다."),
    USER_NOT_FOUND("U002", HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."),
    PASSWORD_NOT_MATCH("U003", HttpStatus.BAD_REQUEST, "비밀번호가 일치하지 않습니다."),
    USER_NOT_AUTHORIZED("U004", HttpStatus.FORBIDDEN, "해당 작업을 수행할 권한이 없습니다."),
    EMAIL_CODE_NOT_MATCH("U005", HttpStatus.BAD_REQUEST, "인증 코드가 일치하지 않습니다."),
    USER_DELETE_FAILED("U006", HttpStatus.BAD_REQUEST, "회원 탈퇴에 실패했습니다."),
    TEMP_USER_NOT_FOUND("U007", HttpStatus.NOT_FOUND, "임시 사용자를 찾을 수 없습니다."),
    OAUTH_CODE_NOT_FOUND("U008", HttpStatus.NOT_FOUND, "OAuth 코드를 찾을 수 없습니다."),
    ALREADY_EXIST_PHONE_NUMBER("U009", HttpStatus.BAD_REQUEST, "이미 존재하는 전화번호입니다."),

    // Unauthorized
    AUTHENTICATION_FAILED("A001", HttpStatus.UNAUTHORIZED, "인증에 실패했습니다."),
    NO_JWT_TOKEN("A002", HttpStatus.UNAUTHORIZED, "JWT 토큰이 없습니다."),
    INVALID_JWT_TOKEN("A003", HttpStatus.UNAUTHORIZED, "유효하지 않은 JWT 토큰입니다."),
    ACCESS_TOKEN_EXPIRED("A004", HttpStatus.UNAUTHORIZED, "Access Token이 만료되었습니다."),
    REFRESH_TOKEN_EXPIRED("A005", HttpStatus.UNAUTHORIZED, "Refresh Token이 만료되었습니다."),
    REFRESH_TOKEN_BLACKLISTED("A006", HttpStatus.UNAUTHORIZED, "블랙리스트에 등록된 Refresh Token입니다."),
    REFRESH_TOKEN_NOT_FOUND("A007", HttpStatus.UNAUTHORIZED, "Refresh Token을 찾을 수 없습니다."),

    // File Error
    FILE_UPLOAD_FAILED("F001", HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다."),
    INVALID_FILE_FORMAT("F002", HttpStatus.BAD_REQUEST, "유효하지 않은 파일 형식입니다."),
    FILE_DOWNLOAD_FAILED("F003", HttpStatus.INTERNAL_SERVER_ERROR, "파일 다운로드에 실패했습니다"),
    S3_SERVER_ERROR("F004", HttpStatus.INTERNAL_SERVER_ERROR, "S3 서버에 문제가 발생하였습니다"),

    // Pagination Error
    INVALID_PAGE_NUMBER("P001", HttpStatus.BAD_REQUEST, "유효하지 않은 페이지 번호입니다."),
    INVALID_PAGE_SIZE("P002", HttpStatus.BAD_REQUEST, "유효하지 않은 페이지 크기입니다."),

    // Notification Error
    NOTIFICATION_NOT_FOUND("N001", HttpStatus.NOT_FOUND, "알림을 찾을 수 없습니다.");

    private final String code;
    private final HttpStatus status;
    private final String message;

    ErrorCode(String code, HttpStatus status, String message) {
        this.code = code;
        this.status = status;
        this.message = message;
    }
}