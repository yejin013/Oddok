package com.oddok.server.domain.user.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class GetUserResponse {
    private final Long id;
    private final String email;
    private final String nickname;

    @Builder
    public GetUserResponse(Long id, String email, String nickname) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
    }
}
