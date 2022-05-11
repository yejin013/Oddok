package com.oddok.server.domain.studyroom.api.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
public class UpdateStudyRoomResponse {
    private final String name;

    private final String category;

    private final List<String> hashtags;

    private final Long userId;

    private final String image;

    private final Boolean isPublic;

    private final String password;

    private final Integer targetTime;

    private final String rule;

    private final Boolean isMicOn;

    private final Boolean isCamOn;

    private final String bgm;

    private final Integer currentUsers;

    private final Integer limitUsers;

    private final LocalDate endAt;

    @Builder
    public UpdateStudyRoomResponse(String name, String category, List<String> hashtags, Long userId,
                                   String image, String password, Boolean isPublic, Integer targetTime,
                                   String rule, Boolean isMicOn, Boolean isCamOn, String bgm,
                                   Integer currentUsers, Integer limitUsers, LocalDate endAt) {
        this.name = name;
        this.category = category;
        this.hashtags = hashtags;
        this.userId = userId;
        this.image = image;
        this.isPublic = isPublic;
        this.password = password;
        this.targetTime = targetTime;
        this.rule = rule;
        this.isMicOn = isMicOn;
        this.isCamOn = isCamOn;
        this.bgm = bgm;
        this.currentUsers = currentUsers;
        this.limitUsers = limitUsers;
        this.endAt = endAt;
    }
}
