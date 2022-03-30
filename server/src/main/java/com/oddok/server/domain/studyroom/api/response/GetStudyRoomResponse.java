package com.oddok.server.domain.studyroom.api.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class GetStudyRoomResponse {
    private String name;

    private String category;

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
    public GetStudyRoomResponse(String name, Boolean isPublic) {
        this.name = name;
        this.isPublic = isPublic;
    }

    @Builder
    public GetStudyRoomResponse(Boolean isPublic) {
        this.isPublic = isPublic;
    }
}
