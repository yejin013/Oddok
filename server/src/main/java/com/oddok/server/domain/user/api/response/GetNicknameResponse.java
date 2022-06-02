package com.oddok.server.domain.user.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class GetNicknameResponse {
    private final String nickname;

    @Builder
    public GetNicknameResponse(String nickname) {
        this.nickname = nickname;
    }
}
