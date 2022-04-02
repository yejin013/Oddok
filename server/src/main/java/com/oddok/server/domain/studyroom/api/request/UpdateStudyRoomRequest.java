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

    @NotNull
    private String category;

    /*
    @NotNull
    private String hashtags;

    private String image;
*/
    @NotNull
    private Boolean isPublic;

    private String password;

    /*
    private Integer targetTime;

    private String rule;

    private Boolean isMicOn;

    private Boolean isCamOn;

    private Integer limitUsers;

    private LocalDateTime startAt;

    private LocalDateTime endAt;
     */
}
