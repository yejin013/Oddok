package com.oddok.server.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class MyPageDto {

    private String goal;

    private LocalDateTime targetTime;

    private LocalDateTime dDay;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;
}
