package com.pawly.domain.flask.service;

import lombok.Getter;
import org.apache.http.impl.client.RequestWrapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.UUID;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.LinkedBlockingQueue;

@Service
public class FlaskService {

    private final WebClient webClient;
    private final BlockingQueue<RequestWrapper> requestQueue = new LinkedBlockingQueue<>();
    private final ConcurrentHashMap<String, CompletableFuture<String>> pendingRequests = new ConcurrentHashMap<>();

    public FlaskService(WebClient.Builder webClientBuilder,
        @Value("${flask.url}") String flaskUrl) {
        this.webClient = webClientBuilder.baseUrl(flaskUrl).build();
    }

    public CompletableFuture<String> sendRequestToFlask(String word) {
        String requestId = UUID.randomUUID().toString();
        CompletableFuture<String> future = new CompletableFuture<>();
        pendingRequests.put(requestId, future);  // 요청 ID와 CompletableFuture 매핑
        requestQueue.add(new RequestWrapper(requestId, word));
        return future;
    }

    public int getQueueSize() {
        return requestQueue.size();
    }

    // 지정된 개수만큼 큐에서 요청을 꺼내어 Flask로 전송
    public void processQueue(int maxRequests) {
        for (int i = 0; i < maxRequests && !requestQueue.isEmpty(); i++) {
            RequestWrapper requestWrapper = requestQueue.poll();
            if (requestWrapper != null) {
                sendToFlask(requestWrapper);
            }
        }
    }

    private void sendToFlask(RequestWrapper requestWrapper) {
        webClient.get()
            .uri(uriBuilder -> uriBuilder
                .path("/flask/make_image")
                .queryParam("word", requestWrapper.getWord())
                .build())
            .retrieve()
            .bodyToMono(String.class)
            .doOnSuccess(result -> completeRequest(requestWrapper.getRequestId(), result))
            .subscribe();
    }

    private void completeRequest(String requestId, String result) {
        CompletableFuture<String> future = pendingRequests.remove(requestId);
        if (future != null) {
            future.complete(result);  // Flask 응답을 CompletableFuture에 전달하여 클라이언트에 반환
        }
    }

    // 요청 객체 래퍼 클래스
    @Getter
    public static class RequestWrapper {
        private final String requestId;
        private final String word;

        public RequestWrapper(String requestId, String word) {
            this.requestId = requestId;
            this.word = word;
        }

    }
}


