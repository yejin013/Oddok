package com.oddok.server.domain.profile.api.request;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CreateProfileRequest {

    private String goal;

    private Integer targetTime;

    private LocalDate dday;
}
