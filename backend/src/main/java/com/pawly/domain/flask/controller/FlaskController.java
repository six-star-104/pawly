package com.pawly.domain.flask.controller;

import com.pawly.domain.flask.service.FlaskService;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import java.util.concurrent.CompletableFuture;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/proxy")
@RequiredArgsConstructor
public class FlaskController {

    private final FlaskService flaskService;

    @GetMapping
    public CompletableFuture<ApiResponse<String>> processWord(@RequestParam String word) {
        return flaskService.sendRequestToFlask(word)
            .thenApply(result -> ApiResponse.createSuccess(result, "요청 성공"))
            .exceptionally(ex -> ApiResponse.createError(ErrorCode.TOO_MANY_REQUEST));
    }
}

