package com.oddok.server.domain.timerecord.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class TimeRecordDto {
    private Long userId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String subject;

    @Builder
    public TimeRecordDto(LocalDateTime startTime, LocalDateTime endTime, String subject) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.subject = subject;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
