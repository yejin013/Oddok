package com.oddok.server.domain.studyroom.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateStudyRoomResponse {

    private final Long studyRoomId;

    private final String sessionId;

}
