package com.pawly.global.response;

import com.pawly.global.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ApiResponse<T> {

    private static final String SUCCESS_STATUS = "success";
    private static final String FAIL_STATUS = "fail";
    private static final String ERROR_STATUS = "error";

    private String status;
    private T data;
    private String code;
    private String message;

    public static <T> ApiResponse<T> createSuccess(T data, String message) {
        return new ApiResponse<>(SUCCESS_STATUS, data, null, message);
    }

    public static <T> ApiResponse<T> createSuccessWithNoContent(String message) {
        return new ApiResponse<>(SUCCESS_STATUS, null, null, message);
    }

    // 예외 발생으로 API 호출 실패시 반환
    public static <T> ApiResponse<T> createError(ErrorCode errorCode) {
        return new ApiResponse<>(ERROR_STATUS, null, errorCode.getCode(), errorCode.getMessage());
    }

    private ApiResponse(String status, T data, String code, String message) {
        this.status = status;
        this.data = data;
        this.code = code;
        this.message = message;
    }
}