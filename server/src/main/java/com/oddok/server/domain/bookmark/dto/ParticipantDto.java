package com.oddok.server.domain.bookmark.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ParticipantDto {
    private String nickname;
    private LocalDateTime joinTime;

    @Builder
    public ParticipantDto(String nickname, LocalDateTime joinTime) {
        this.nickname = nickname;
        this.joinTime = joinTime;
    }
}
