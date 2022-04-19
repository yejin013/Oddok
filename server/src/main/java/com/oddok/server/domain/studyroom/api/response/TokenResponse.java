package com.oddok.server.domain.studyroom.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class TokenResponse {

    private final String token;

    @Builder
    public TokenResponse(String token) {
        this.token = token;
    }

}
