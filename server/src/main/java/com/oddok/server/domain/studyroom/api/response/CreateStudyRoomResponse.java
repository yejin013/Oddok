package com.oddok.server.domain.studyroom.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CreateStudyRoomResponse {

    private final Long id;

    @Builder
    public CreateStudyRoomResponse(Long id) {
        this.id = id;
    }
}
