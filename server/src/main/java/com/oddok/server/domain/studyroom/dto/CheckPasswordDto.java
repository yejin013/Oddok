package com.oddok.server.domain.studyroom.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CheckPasswordDto {
    private Long studyRoomId;
    private String password;

    @Builder
    public CheckPasswordDto(Long studyRoomId, String password) {
        this.studyRoomId = studyRoomId;
        this.password = password;
    }
}
