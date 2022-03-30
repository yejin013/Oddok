package com.oddok.server.domain.studyroom.api.response;

import com.oddok.server.domain.studyroom.dto.StudyRoomHashtagDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class GetStudyRoomResponse {
    private String name;

    private String category;

    private List<String> hashtags;

    private String image;

    private Boolean isPublic;

    private Integer targetTime;

    private String rule;

    private Boolean isMicOn;

    private Boolean isCamOn;

    private Integer currentUsers;

    private Integer limitUsers;

    private LocalDateTime startAt;

    private LocalDateTime endAt;


    @Builder
    public GetStudyRoomResponse(String name, List<String> hashtags, Boolean isPublic) {
        this.name = name;
        this.hashtags = hashtags;
        this.isPublic = isPublic;
    }

    @Builder
    public GetStudyRoomResponse(Boolean isPublic) {
        this.isPublic = isPublic;
    }
}
