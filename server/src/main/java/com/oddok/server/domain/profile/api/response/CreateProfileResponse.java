package com.oddok.server.domain.profile.api.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CreateProfileResponse {
    private final String goal;

    private final Integer targetTime;

    private final LocalDate dday;

    private final String ddayInfo;

    @Builder
    public CreateProfileResponse(String goal, Integer targetTime, LocalDate dday, String ddayInfo) {
        this.goal = goal;
        this.targetTime = targetTime;
        this.dday = dday;
        this.ddayInfo = ddayInfo;
    }
}
