package com.oddok.server.domain.studyroom.dto;

import lombok.Getter;

@Getter
public class GetTokenDto {
    Long studyRoomId;
    String user;
    Boolean isMaster;

    public GetTokenDto(Long studyRoomId, String user, Boolean isMaster) {
        this.studyRoomId = studyRoomId;
        this.user = user;
        this.isMaster = isMaster;
    }
}
