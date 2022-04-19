package com.oddok.server.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserDto {
    private Long id;

    private String email;

//    private String nickname;

    @Builder
    public UserDto (Long id, String email) {
        this.id = id;
        this.email = email;
    }
}