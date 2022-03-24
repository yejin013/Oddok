package com.oddok.server.domain.studyroom.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class StudyRoomDto {
    private Long id;

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

    @Builder
    public StudyRoomDto(Long id, String name, Long userId, String sessionId) {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.sessionId = sessionId;
    }
}