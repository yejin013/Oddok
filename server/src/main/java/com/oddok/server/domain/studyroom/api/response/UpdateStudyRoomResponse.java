package com.oddok.server.domain.studyroom.api.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class UpdateStudyRoomResponse {
    private String name;

    private String category;

    private Long userId;

    private String sessionId;

    private String image;

    private Boolean isPublic;

    private String password;

    private Integer targetTime;

    private String rule;

    private Boolean isMicOn;

    private Boolean isCamOn;

    private Integer currentUsers;

    private Integer limitUsers;

    private LocalDateTime startAt;

    private LocalDateTime endAt;
}
