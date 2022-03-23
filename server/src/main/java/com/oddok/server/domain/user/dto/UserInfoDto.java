package com.oddok.server.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class UserInfoDto { // mypage에서 사용하는 dto
    private String email;

    private String nickname;

    private String goal;

    private LocalDateTime targetTime;

    private LocalDateTime dDay;

    private LocalDateTime createAt;

    @Builder
    public UserInfoDto (String email, String nickname, String goal,
                        LocalDateTime targetTime, LocalDateTime dDay, LocalDateTime createAt) {
        this.email = email;
        this.nickname = nickname;
        this.goal = goal;
        this.targetTime = targetTime;
        this.dDay = dDay;
        this.createAt = createAt;
    }
}
