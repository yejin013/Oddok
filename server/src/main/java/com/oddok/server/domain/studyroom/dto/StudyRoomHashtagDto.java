package com.oddok.server.domain.studyroom.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class StudyRoomHashtagDto {
    private String hashtag;

    @Builder
    public StudyRoomHashtagDto(String hashtag) {
        this.hashtag = hashtag;
    }
}
