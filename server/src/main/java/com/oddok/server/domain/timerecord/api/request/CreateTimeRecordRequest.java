package com.oddok.server.domain.timerecord.api.request;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CreateTimeRecordRequest {
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String subject;
}
