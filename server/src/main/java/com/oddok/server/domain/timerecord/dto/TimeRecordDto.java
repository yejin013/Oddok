package com.oddok.server.domain.timerecord.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class TimeRecordDto {
    private String userId;
    private LocalDateTime start_time;
    private LocalDateTime end_time;
    private String subject;

    @Builder
    public TimeRecordDto(String userId, LocalDateTime start_time, LocalDateTime end_time, String subject) {
        this.userId = userId;
        this.start_time = start_time;
        this.end_time = end_time;
        this.subject = subject;
    }
}
