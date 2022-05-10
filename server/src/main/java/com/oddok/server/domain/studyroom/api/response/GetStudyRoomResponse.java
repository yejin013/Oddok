package com.oddok.server.domain.studyroom.api.response;

import com.oddok.server.domain.studyroom.entity.Category;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
public class GetStudyRoomResponse {
    private String name;

    private Category category;

    private List<String> hashtags;

    private String image;

    private Boolean isPublic;

    private Integer targetTime;

    private String rule;

    private Boolean isMicOn;

    private Boolean isCamOn;

    private Integer currentUsers;

    private Integer limitUsers;

    private LocalDate endAt;

    @Builder
    public GetStudyRoomResponse(String name, Category category, List<String> hashtags, String image,
                                Boolean isPublic, Integer targetTime, String rule, Boolean isMicOn,
                                Boolean isCamOn, Integer currentUsers, Integer limitUsers, LocalDate endAt) {
        this.name = name;
        this.category = category;
        this.hashtags = hashtags;
        this.image = image;
        this.isPublic = isPublic;
        this.targetTime = targetTime;
        this.rule = rule;
        this.isMicOn = isMicOn;
        this.isCamOn = isCamOn;
        this.currentUsers = currentUsers;
        this.limitUsers = limitUsers;
        this.endAt = endAt;
    }

}
