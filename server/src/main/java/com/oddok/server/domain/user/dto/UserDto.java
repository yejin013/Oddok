package com.oddok.server.domain.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class UserDto {
    private Long id;

    private String email;

    private String nickname;

    private String goal;

    private LocalDateTime targetTime;

    private LocalDateTime dDay;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;
}
