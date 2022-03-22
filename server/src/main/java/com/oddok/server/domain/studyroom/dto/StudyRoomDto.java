package com.oddok.server.domain.studyroom.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class StudyRoomDto {
    private Long id;

    private String name;

    private Long userId;

    private String sessionId;

    private String image;

    private Boolean isPublic;

    private String password;

    private Integer targetTime;

    private String rule;

    private Integer currentUsers;

    private Integer limitUsers;

    private LocalDateTime startAt;

    private LocalDateTime endAt;
}
