package com.oddok.server.domain.studyroom.dto;

import com.oddok.server.domain.studyroom.entity.Category;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import lombok.*;

@Getter
public class StudyRoomDto {
    private Long id;

    private final String name;

    private final Category category;

    private final Long userId;

    private final String sessionId;

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

    private final Set<String> hashtags;

    @Builder
    public StudyRoomDto(Long id, String name, Category category,
                        Long userId, String sessionId, String image,
                        Boolean isPublic, String password, Integer targetTime,
                        String rule, Boolean isMicOn, Boolean isCamOn,
                        String bgm, Integer currentUsers, Integer limitUsers,
                        LocalDate endAt, Set<String> hashtags) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.userId = userId;
        this.sessionId = sessionId;
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
        this.hashtags = Objects.requireNonNullElseGet(hashtags, HashSet::new);
    }

    @Builder
    public StudyRoomDto(String name, Category category, Long userId,
                        String sessionId, String image, Boolean isPublic,
                        String password, Integer targetTime, String rule,
                        Boolean isMicOn, Boolean isCamOn, String bgm,
                        Integer currentUsers, Integer limitUsers, LocalDate endAt,
                        Set<String> hashtags) {
        this.name = name;
        this.category = category;
        this.userId = userId;
        this.sessionId = sessionId;
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
        this.hashtags = Objects.requireNonNullElseGet(hashtags, HashSet::new);
    }
}