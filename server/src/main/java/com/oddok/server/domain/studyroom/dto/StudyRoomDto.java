package com.oddok.server.domain.studyroom.dto;

import com.oddok.server.domain.user.dto.UserDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class StudyRoomDto {
    private Long id;

    private String name;

    private UserDto user;

    private String sessionId;

    private String image;

    private Boolean isPublic;

    private String password;

    private Integer targetTime;

    private String rule;

    private Integer currentUsers;

    private Integer limitUsers;

    private LocalDateTime startAt;

    private LocalDateTime endAt;

    public StudyRoomDto(String name, UserDto user, String sessionId) {
        this.name = name;
        this.user = user;
        this.sessionId = sessionId;
    }

    @Builder
    public StudyRoomDto(Long id, String name, UserDto user, String sessionId,
                        String image, Boolean isPublic, String password,
                        Integer targetTime, String rule, Integer currentUsers,
                        Integer limitUsers, LocalDateTime startAt, LocalDateTime endAt) {
        this.id = id;
        this.name = name;
        this.user = user;
        this.sessionId = sessionId;
        this.image = image;
        this.isPublic = isPublic;
        this.password = password;
        this.targetTime = targetTime;
        this.rule = rule;
        this.currentUsers = currentUsers;
        this.limitUsers = limitUsers;
        this.startAt = startAt;
        this.endAt = endAt;
    }
}
