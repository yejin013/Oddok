package com.oddok.server.domain.profile.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
public class ProfileDto {

    private String goal;

    private LocalDate targetTime;

    private LocalDate dDay;

    @Builder
    public ProfileDto(String goal, LocalDate targetTime, LocalDate dDay) {
        this.goal = goal;
        this.targetTime = targetTime;
        this.dDay = dDay;
    }
}
