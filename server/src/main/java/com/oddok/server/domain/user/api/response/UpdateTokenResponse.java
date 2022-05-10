package com.oddok.server.domain.user.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UpdateTokenResponse {
    private final String accessToken;

    @Builder
    public UpdateTokenResponse(String token) {
        this.accessToken = token;
    }
}
