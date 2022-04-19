package com.oddok.server.domain.studyroom.dto;

import com.oddok.server.domain.studyroom.entity.StudyRoom;
import com.oddok.server.domain.user.dto.UserDto;
import com.oddok.server.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ParticipantDto {
    private StudyRoomDto studyRoom;
    private UserDto user;
    private LocalDateTime joinTime;

    @Builder
    public ParticipantDto(StudyRoomDto studyRoom, UserDto user, LocalDateTime joinTime) {
        this.studyRoom = studyRoom;
        this.user = user;
        this.joinTime = joinTime;
    }
}
