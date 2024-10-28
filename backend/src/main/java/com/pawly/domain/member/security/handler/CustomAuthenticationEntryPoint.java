package com.pawly.domain.member.security.handler;

import com.pawly.global.exception.ErrorCode;
import com.pawly.global.util.ErrorResponseUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
        AuthenticationException authException) throws IOException, ServletException {
        ErrorCode errorCode;

        if(authException instanceof BadCredentialsException){
            errorCode = ErrorCode.PASSWORD_NOT_MATCH;
        }
        else if(authException instanceof UsernameNotFoundException){
            errorCode = ErrorCode.USER_NOT_FOUND;
        }
        else if(response.getStatus() == HttpServletResponse.SC_NOT_FOUND) {
            errorCode = ErrorCode.RESOURCE_NOT_FOUND;
        }
        else {
            System.out.println(authException.getMessage());
            errorCode = ErrorCode.AUTHENTICATION_FAILED;
        }

        ErrorResponseUtil.sendErrorResponse(response, errorCode);

    }
}