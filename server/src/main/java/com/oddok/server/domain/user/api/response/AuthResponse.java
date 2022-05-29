package com.oddok.server.domain.user.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AuthResponse {
    private final String accessToken;

    @Builder
    public AuthResponse(String accessToken) {
        this.accessToken = accessToken;
    }
}
