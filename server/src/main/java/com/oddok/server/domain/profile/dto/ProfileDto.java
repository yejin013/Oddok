package com.oddok.server.domain.profile.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
public class ProfileDto {

    private Long userId;

    private String goal;

    private Integer targetTime;

    private LocalDate dday;

    @Builder
    public ProfileDto(Long userId, String goal, Integer targetTime, LocalDate dday) {
        this.userId = userId;
        this.goal = goal;
        this.targetTime = targetTime;
        this.dday = dday;
    }
}
