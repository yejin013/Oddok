package com.oddok.server.domain.studyroom.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class IdClassForParticipantDto {
    Long studyRoomId;
    String userId;

    @Builder
    public IdClassForParticipantDto(Long studyRoomId, String userId) {
        this.studyRoomId = studyRoomId;
        this.userId = userId;
    }
}
