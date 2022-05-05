package com.oddok.server.domain.user.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AuthResponse {
    private final String appToken;

    @Builder
    public AuthResponse(String appToken) {
        this.appToken = appToken;
    }
}
