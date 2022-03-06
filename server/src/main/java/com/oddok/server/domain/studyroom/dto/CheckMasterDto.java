package com.oddok.server.domain.studyroom.dto;

import lombok.Getter;

@Getter
public class CheckMasterDto {
    Long studyRoomId;
    String user;

    public CheckMasterDto(Long studyRoomId, String user) {
        this.studyRoomId = studyRoomId;
        this.user = user;
    }
}
