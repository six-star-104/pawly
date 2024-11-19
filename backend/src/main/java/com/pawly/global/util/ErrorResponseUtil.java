package com.pawly.global.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.http.MediaType;

public class ErrorResponseUtil {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static void sendErrorResponse(
        HttpServletResponse response, ErrorCode errorCode) throws IOException {
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.setStatus(errorCode.getHttpStatus().value());

        String jsonResponse = objectMapper.writeValueAsString(ApiResponse.createError(errorCode));
        response.getWriter().write(jsonResponse);
    }
}
