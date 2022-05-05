package com.oddok.server.domain.user.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UpdateTokenResponse {
    private final String token;

    @Builder
    public UpdateTokenResponse(String token) {
        this.token = token;
    }
}
