package com.oddok.server.domain.studyroom.api.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateStudyRoomRequest {
    private String name;

    private String image;

    private Boolean isPublic;

    private String password;

    private Integer targetTime;

    private String rule;

    private Integer limitUsers;

    private LocalDateTime startAt;

    private LocalDateTime endAt;
}
