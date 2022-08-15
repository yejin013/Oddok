package com.oddok.server.domain.user.api.response;

import com.oddok.server.domain.studyroom.entity.Category;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class GetMyStudyRoomResponse {
    private final Long id;

    private final String name;

    private final Category category;

    private final Long userId;

    private final List<String> hashtags;

    private final String image;

    private final Boolean isPublic;

    private final Integer targetTime;

    private final String rule;

    private final Boolean isMicOn;

    private final Boolean isCamOn;

    private final String bgm;

    private final Integer currentUsers;

    private final Integer limitUsers;

    private final LocalDate endAt;

    @Builder
    public GetMyStudyRoomResponse(Long id, String name, Category category, Long userId, List<String> hashtags, String image,
                                Boolean isPublic, Integer targetTime, String rule, Boolean isMicOn,
                                Boolean isCamOn, Integer currentUsers, String bgm,
                                Integer limitUsers, LocalDate endAt) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.userId = userId;
        this.hashtags = hashtags;
        this.image = image;
        this.isPublic = isPublic;
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