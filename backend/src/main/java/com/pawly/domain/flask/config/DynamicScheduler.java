package com.pawly.domain.flask.config;

import com.pawly.domain.flask.service.FlaskService;
import java.util.concurrent.ScheduledFuture;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.stereotype.Component;

@Component
public class DynamicScheduler {

    private final TaskScheduler taskScheduler;
    private ScheduledFuture<?> scheduledTask;
    private final FlaskService flaskService;

    public DynamicScheduler(FlaskService flaskService) {
        ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
        scheduler.initialize();
        this.taskScheduler = scheduler;
        this.flaskService = flaskService;
    }

    // 요청 수에 따라 스케줄링 간격 및 최대 처리 개수를 조정
    public void adjustScheduler() {
        int queueSize = flaskService.getQueueSize();
        if (queueSize >= 5) {
            startScheduler(60000, 4); // 요청이 5개 이상일 때 15초마다 4개 처리
        } else {
            startScheduler(15000, 1); // 요청이 5개 미만일 때 15초마다 1개 처리
        }
    }

    private void startScheduler(long intervalInMillis, int maxRequests) {
        if (scheduledTask != null) {
            scheduledTask.cancel(false); // 기존 스케줄 취소
        }
        scheduledTask = taskScheduler.scheduleAtFixedRate(() -> flaskService.processQueue(maxRequests), intervalInMillis);
    }
}

