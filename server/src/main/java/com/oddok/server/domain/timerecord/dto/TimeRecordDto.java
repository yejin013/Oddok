package com.oddok.server.domain.timerecord.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class TimeRecordDto {
    private final LocalDateTime startTime;
    private final LocalDateTime endTime;
    private final String subject;

    @Builder
    public TimeRecordDto(LocalDateTime startTime, LocalDateTime endTime, String subject) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.subject = subject;
    }
}
