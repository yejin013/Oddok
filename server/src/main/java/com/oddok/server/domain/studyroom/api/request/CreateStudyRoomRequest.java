package com.oddok.server.domain.studyroom.api.request;

import com.fasterxml.jackson.annotation.JacksonInject;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor
public class CreateStudyRoomRequest {

    private String name;

    @NotBlank
    private String category;

    private String image;

    @NotNull
    private Boolean isPublic;

    private String password;

    private Integer targetTime;

    private String rule;

    private Boolean isMicOn;

    private Boolean isCamOn;

    private Integer currentUsers;

    private Integer limitUsers;

    private LocalDate endAt;

    private List<String> hashtags;

}
