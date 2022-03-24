package com.oddok.server.domain.studyroom.api.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class UpdateStudyRoomRequest {

    @NotBlank(message = "방 이름이 없습니다.")
    private String name;

    /*
    @NotNull
    private String category;

    @NotNull
    private String hashtags;

    @NotNull
    private String image;

    @NotNull
    private Boolean isPublic;

    @NotNull
    private String password;

    @NotNull
    private Integer targetTime;

    @NotNull
    private String rule;

    @NotNull
    private Boolean isMicOn;

    @NotNull
    private Boolean isCamOn;

    @NotNull
    private Integer limitUsers;

    @NotNull
    private LocalDateTime startAt;

    @NotNull
    private LocalDateTime endAt;

     */
}
