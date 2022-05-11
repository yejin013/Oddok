package com.oddok.server.domain.profile.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
public class ProfileDto {

    private final Long userId;

    private final String goal;

    private final Integer targetTime;

    private final LocalDate dday;

    private final String ddayInfo;

    @Builder
    public ProfileDto(Long userId, String goal, Integer targetTime, LocalDate dday, String ddayInfo) {
        this.userId = userId;
        this.goal = goal;
        this.targetTime = targetTime;
        this.dday = dday;
        this.ddayInfo = ddayInfo;
    }
}
