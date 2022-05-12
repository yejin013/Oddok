package com.oddok.server.domain.timerecord.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class TimeRecordDto {
    private final Long id;
    private final LocalDateTime startTime;
    private final LocalDateTime endTime;
    private final String subject;

    @Builder
    public TimeRecordDto(Long id, LocalDateTime startTime, LocalDateTime endTime, String subject) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.subject = subject;
    }
}
