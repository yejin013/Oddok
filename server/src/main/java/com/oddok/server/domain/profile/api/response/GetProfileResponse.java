package com.oddok.server.domain.profile.api.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class GetProfileResponse {
    private final String goal;

    private final Integer targetTime;

    private final LocalDate dday;

    @Builder
    public GetProfileResponse(String goal, Integer targetTime, LocalDate dday) {
        this.goal = goal;
        this.targetTime = targetTime;
        this.dday = dday;
    }
}
