package com.oddok.server.domain.studyroom.dto;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public class StudyRoomDto {

    private String name;

    private Long user;

    private String image;

    private Boolean isPublic;

    private String password;

    private Integer targetTime;

    private String rule;

    private Integer limitUsers;

    private LocalDateTime startAt;

    private LocalDateTime endAt;
}
