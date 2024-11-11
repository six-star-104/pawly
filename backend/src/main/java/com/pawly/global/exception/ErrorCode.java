
 package com.pawly.global.exception;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import lombok.RequiredArgsConstructor;
@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    // Internal Server Error
    INTERNAL_SERVER_ERROR("C001", HttpStatus.INTERNAL_SERVER_ERROR, "서버에 오류가 발생했습니다."),
    NOT_FOUND_API_URL("C002", HttpStatus.NOT_FOUND, "요청한 API url을 찾을 수 없습니다."),
    RESOURCE_NOT_FOUND("C003", HttpStatus.NOT_FOUND, "요청한 리소스를 찾을 수 없습니다."),
    ACCESS_DENIED("C004", HttpStatus.FORBIDDEN, "접근이 거부되었습니다."),

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
    USER_UPDATE_FAILED("U010", HttpStatus.BAD_REQUEST, "사용자 정보 업데이트에 실패했습니다."),
    EMAIL_ALREADY_EXIST("U011", HttpStatus.BAD_REQUEST, "이미 존재하는 이메일입니다."),
    NICKNAME_ALREADY_USED("U012", HttpStatus.BAD_REQUEST, "닉네임 중복 조회에 실패했습니다."),
    NICKNAME_NOT_FOUND("U013", HttpStatus.BAD_REQUEST, "닉네임 조회에 실패했습니다."),
    NOT_ADMIN_FAILED("U014", HttpStatus.BAD_REQUEST, "관리자 권한이 없습니다."),

    // Unauthorized
    AUTHENTICATION_FAILED("A001", HttpStatus.UNAUTHORIZED, "인증에 실패했습니다."),
    NO_JWT_TOKEN("A002", HttpStatus.UNAUTHORIZED, "JWT 토큰이 없습니다."),
    INVALID_JWT_TOKEN("A003", HttpStatus.UNAUTHORIZED, "유효하지 않은 JWT 토큰입니다."),
    ACCESS_TOKEN_EXPIRED("A004", HttpStatus.UNAUTHORIZED, "Access Token이 만료되었습니다."),
    REFRESH_TOKEN_EXPIRED("A005", HttpStatus.UNAUTHORIZED, "Refresh Token이 만료되었습니다."),
    REFRESH_TOKEN_BLACKLISTED("A006", HttpStatus.UNAUTHORIZED, "블랙리스트에 등록된 Refresh Token입니다."),
    REFRESH_TOKEN_NOT_FOUND("A007", HttpStatus.UNAUTHORIZED, "Refresh Token을 찾을 수 없습니다."),

    // AWS S3
    AWS_SERVER_ERROR("A008", HttpStatus.BAD_REQUEST, "AWS S3 서버 에러가 발생했습니다."),

    // Fcm
    NO_FCM_TOKEN("A009", HttpStatus.UNAUTHORIZED, "FCM Token을 찾을 수 없습니다."),

    // File Error
    FILE_UPLOAD_FAILED("F001", HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다."),
    INVALID_FILE_FORMAT("F002", HttpStatus.BAD_REQUEST, "유효하지 않은 파일 형식입니다."),
    FILE_DOWNLOAD_FAILED("F003", HttpStatus.INTERNAL_SERVER_ERROR, "파일 다운로드에 실패했습니다"),
    S3_SERVER_ERROR("F004", HttpStatus.INTERNAL_SERVER_ERROR, "S3 서버에 문제가 발생하였습니다"),

    // Pagination Error
    INVALID_PAGE_NUMBER("P001", HttpStatus.BAD_REQUEST, "유효하지 않은 페이지 번호입니다."),
    INVALID_PAGE_SIZE("P002", HttpStatus.BAD_REQUEST, "유효하지 않은 페이지 크기입니다."),

    // Notification Error
    NOTIFICATION_NOT_FOUND("N001", HttpStatus.NOT_FOUND, "알림을 찾을 수 없습니다."),

    // Friend Error
    ALREADY_FRIEND("E001", HttpStatus.BAD_REQUEST, "이미 친구입니다."),
    NOT_FRIEND("E002", HttpStatus.BAD_REQUEST, "친구가 아닙니다."),
    FRIEND_REQUEST_ALREADY_SENT("E003", HttpStatus.BAD_REQUEST, "이미 친구 요청을 보냈습니다."),
    FRIEND_REQUEST_ALREADY_RECEIVED("E004", HttpStatus.BAD_REQUEST, "이미 친구 요청을 받았습니다."),
    FRIEND_NOT_REQUEST("E005", HttpStatus.BAD_REQUEST, "친구 요청이 없습니다."),
    SELF_FRIEND_REQUEST("E006", HttpStatus.BAD_REQUEST, "본인과는 친구할 수 없습니다."),


    // Letter Error
    LETTER_NOT_FOUND("L001", HttpStatus.NOT_FOUND, "편지를 찾을 수 없습니다."),
    LETTER_SEND_FAILED("L002", HttpStatus.BAD_REQUEST, "편지를 보내지 못했습니다."),
    LETTER_DELETE_FAILED("L003", HttpStatus.BAD_REQUEST, "편지 삭제에 실패했습니다."),
    LETTER_REACTION_FAILED("L004", HttpStatus.BAD_REQUEST, "편지 반응 생성에 실패했습니다."),

    // Proxy Error
    TOO_MANY_REQUEST("T001", HttpStatus.BAD_REQUEST, "요청이 너무 많아요 잠시 기다려 주세요."),

    // RollingPaper Error
    ROLLING_PAPER_NOTFOUND("R001", HttpStatus.NOT_FOUND, "롤링페이퍼를 찾을 수 없습니다."),
    ROLLING_PAPER_CANNOT_CREATE("R002", HttpStatus.BAD_REQUEST,"롤링페이퍼(우체통) 생성 실패"),

    // PostIt Error
    POST_IT_NOTFOUND("I001", HttpStatus.NOT_FOUND, "포스트잇을 찾을 수 없습니다."),

    // EasterEgg Error
    NOT_STATUS("N001", HttpStatus.BAD_REQUEST, "도전 과제를 완료할 수 없습니다."),
    NOT_FOUND_EASTER("N002", HttpStatus.NOT_FOUND, "도전 과제를 찾을 수 없습니다."),
    NOT_EASTER_EGG_ID("N003", HttpStatus.BAD_REQUEST, "잘못된 도전과제 ID입니다."),

    // Postbox Error
    POSTBOX_NOT_FOUND("B001", HttpStatus.NOT_FOUND, "포스트박스를 찾을 수 없습니다."),
    POSTBOX_TOO_MANY("B002", HttpStatus.TOO_MANY_REQUESTS, "포스트박스를 너무 많이 가지고 있습니다."),
    POSTBOX_ALREADY_LOCATED("B003", HttpStatus.TOO_MANY_REQUESTS, "근처에 이미 포스트박스가 존재 합니다."),

    // Theme Error
    THEME_NOT_FOUND("H001", HttpStatus.NOT_FOUND, "테마를 찾을 수 없습니다.");

    private final String code;
    private final HttpStatus httpStatus;
    private final String message;
}