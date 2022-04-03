package com.oddok.server.domain.studyroom.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

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

    private List<String> hashtags;

    @Builder
    public StudyRoomDto(Long id, String name, String category, Long userId, String sessionId, String image, Boolean isPublic, String password, Integer targetTime, String rule, Boolean isMicOn, Boolean isCamOn, Integer currentUsers, Integer limitUsers, LocalDateTime startAt, LocalDateTime endAt, List<String> hashtags) {
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
        this.startAt = startAt;
        this.endAt = endAt;
        this.hashtags = hashtags;
    }

    @Builder
    public StudyRoomDto(String name, String category, Long userId, String sessionId, String image, Boolean isPublic, String password, Integer targetTime, String rule, Boolean isMicOn, Boolean isCamOn, Integer currentUsers, Integer limitUsers, LocalDateTime startAt, LocalDateTime endAt, List<String> hashtags) {
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
        this.startAt = startAt;
        this.endAt = endAt;
        this.hashtags = hashtags;
    }
}