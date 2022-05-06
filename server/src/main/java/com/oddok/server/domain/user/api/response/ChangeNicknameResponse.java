package com.oddok.server.domain.user.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ChangeNicknameResponse {

    private final String nickname;

    @Builder
    public ChangeNicknameResponse(String nickname) {
        this.nickname = nickname;
    }
}
