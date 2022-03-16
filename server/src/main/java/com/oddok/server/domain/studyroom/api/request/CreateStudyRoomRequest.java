package com.oddok.server.domain.studyroom.api.request;

import lombok.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateStudyRoomRequest {

    @NotBlank(message = "방 이름이 없습니다.")
    private String name;

    @NotNull(message = "사용자 id 값이 없습니다.")
    private Long user;

    private String image;

    private Boolean isPublic;

    private String password;

    private Integer targetTime;

    private String rule;

    private Integer limitUsers;

    private LocalDateTime startAt;

    private LocalDateTime endAt;

}
