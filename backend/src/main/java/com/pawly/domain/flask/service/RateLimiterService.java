package com.pawly.domain.flask.service;

import lombok.Getter;
import org.springframework.stereotype.Service;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.LinkedBlockingQueue;

@Service
public class RateLimiterService {

    private final BlockingQueue<RequestWrapper> requestQueue = new LinkedBlockingQueue<>();
    private final ConcurrentHashMap<String, CompletableFuture<String>> pendingRequests = new ConcurrentHashMap<>();

    // 요청 큐에 추가하고 CompletableFuture를 반환하여 비동기 응답을 관리
    public CompletableFuture<String> addRequest(String requestId, String word) {
        CompletableFuture<String> future = new CompletableFuture<>();
        pendingRequests.put(requestId, future);
        requestQueue.add(new RequestWrapper(requestId, word));
        return future;
    }

    // 큐에서 요청을 꺼내 처리할 수 있도록 제공 (FlaskService에서 사용)
    public RequestWrapper pollRequest() {
        return requestQueue.poll();
    }

    // 요청 완료 시 pendingRequests에서 해당 요청을 찾아 CompletableFuture를 완료
    public void completeRequest(String requestId, String result) {
        CompletableFuture<String> future = pendingRequests.remove(requestId);
        if (future != null) {
            future.complete(result);
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


