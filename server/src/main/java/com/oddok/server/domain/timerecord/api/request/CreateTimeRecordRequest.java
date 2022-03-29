package com.oddok.server.domain.timerecord.api.request;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CreateTimeRecordRequest {
    private LocalDateTime start_time;
    private LocalDateTime end_time;
    private String subject;
}
