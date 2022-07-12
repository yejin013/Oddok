package com.oddok.server.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserDto {
    private final Long id;

    private final String userId;

    private final String nickname;

    @Builder
    public UserDto (Long id, String userId, String nickname) {
        this.id = id;
        this.userId = userId;
        this.nickname = nickname;
    }
}