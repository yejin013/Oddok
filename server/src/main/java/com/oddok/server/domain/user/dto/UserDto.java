package com.oddok.server.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserDto {
    private Long id;

    private String email;

    private String nickname;
}