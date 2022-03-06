package com.oddok.server.domain.studyroom.dto;

import lombok.Getter;

@Getter
public class CorrectDto {
    Boolean correct;

    public CorrectDto(Boolean correct) {
        this.correct = correct;
    }
}
