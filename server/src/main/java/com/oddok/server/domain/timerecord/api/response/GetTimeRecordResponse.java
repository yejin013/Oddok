package com.oddok.server.domain.timerecord.api.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class GetTimeRecordResponse {
    private final LocalDateTime startTime;
    private final LocalDateTime endTime;
    private final String subject;

    @Builder
    public GetTimeRecordResponse(LocalDateTime startTime, LocalDateTime endTime, String subject) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.subject = subject;
    }
}
