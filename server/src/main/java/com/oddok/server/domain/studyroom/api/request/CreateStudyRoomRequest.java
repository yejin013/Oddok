package com.oddok.server.domain.studyroom.api.request;

import lombok.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateStudyRoomRequest {

    @NotBlank(message = "방 이름이 없습니다.")
    private String name;

    private String category;

    private String hashtags;

    private String image;

    private Integer targetTime;

    private Integer limitUsers;

    private Boolean isPublic;

    private String password;

    private String rule;

    private LocalDateTime startAt;

    private LocalDateTime endAt;

}
