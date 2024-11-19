package com.pawly.domain.flask.controller;

import com.pawly.domain.flask.config.DynamicScheduler;
import com.pawly.domain.flask.service.FlaskService;
import com.pawly.global.exception.ErrorCode;
import com.pawly.global.response.ApiResponse;
import java.util.concurrent.CompletableFuture;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/proxy")
@RequiredArgsConstructor
public class FlaskController {

    private final FlaskService flaskService;
    private final DynamicScheduler dynamicScheduler;

    @GetMapping
    public CompletableFuture<ResponseEntity<String>> processWord(@RequestParam String word) {
        dynamicScheduler.adjustScheduler(); // 요청이 올 때마다 스케줄 조정
        return flaskService.sendRequestToFlask(word)
            .thenApply(result -> new ResponseEntity<>(result, HttpStatus.OK))
            .exceptionally(ex -> new ResponseEntity<>("error", HttpStatus.BAD_REQUEST));
    }
}

