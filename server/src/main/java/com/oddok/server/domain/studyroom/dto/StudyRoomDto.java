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

    private String name;

    private Category category;

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

    private LocalDate endAt;

    private Set<String> hashtags;

    @Builder
    public StudyRoomDto(Long id, String name, Category category, Long userId, String sessionId, String image, Boolean isPublic, String password, Integer targetTime, String rule, Boolean isMicOn, Boolean isCamOn, Integer currentUsers, Integer limitUsers, LocalDate endAt, Set<String> hashtags) {
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
        this.currentUsers = currentUsers;
        this.limitUsers = limitUsers;
        this.endAt = endAt;
        this.hashtags = Objects.requireNonNullElseGet(hashtags, HashSet::new);
    }

    @Builder
    public StudyRoomDto(String name, Category category, Long userId, String sessionId, String image, Boolean isPublic, String password, Integer targetTime, String rule, Boolean isMicOn, Boolean isCamOn, Integer currentUsers, Integer limitUsers, LocalDate endAt, Set<String> hashtags) {
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
        this.currentUsers = currentUsers;
        this.limitUsers = limitUsers;
        this.endAt = endAt;
        this.hashtags = Objects.requireNonNullElseGet(hashtags, HashSet::new);
    }
}