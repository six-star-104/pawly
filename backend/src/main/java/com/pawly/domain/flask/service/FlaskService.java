package com.pawly.domain.flask.service;

import java.util.concurrent.CompletableFuture;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.UUID;

@Service
public class FlaskService {

    private final WebClient webClient;
    private final RateLimiterService rateLimiterService;

    public FlaskService(WebClient.Builder webClientBuilder, RateLimiterService rateLimiterService, @Value("${flask.url}") String flaskUrl) {
        this.webClient = webClientBuilder.baseUrl(flaskUrl).build();
        this.rateLimiterService = rateLimiterService;
    }

    // 비동기적으로 요청을 추가하고 바로 응답을 반환
    public CompletableFuture<String> sendRequestToFlask(String word) {
        String requestId = UUID.randomUUID().toString();
        return rateLimiterService.addRequest(requestId, word); // 큐에 추가하고 CompletableFuture 반환
    }

    // 1분마다 5개의 요청을 큐에서 처리하여 Flask로 전송
    @Scheduled(fixedRate = 15000) // 12초마다 실행
    public void processQueue() {
        RateLimiterService.RequestWrapper requestWrapper = rateLimiterService.pollRequest();
        if (requestWrapper != null) {
            sendToFlask(requestWrapper);
        }
    }

    // Flask 서버에 요청을 전송하고 비동기적으로 응답 처리
    private void sendToFlask(RateLimiterService.RequestWrapper requestWrapper) {
        webClient.get()
            .uri(uriBuilder -> uriBuilder
                .path("/flask/make_image")
                .queryParam("word", requestWrapper.getWord())
                .build())
            .retrieve()
            .bodyToMono(String.class)
            .doOnSuccess(result -> rateLimiterService.completeRequest(requestWrapper.getRequestId(), result))
            .subscribe();
    }
}

