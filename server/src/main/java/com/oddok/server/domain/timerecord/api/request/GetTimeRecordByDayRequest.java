package com.oddok.server.domain.timerecord.api.request;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class GetTimeRecordByDayRequest {
    private LocalDate day;
}
