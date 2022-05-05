package com.oddok.server.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class TokensDto {
    private final String accessToken;
    private final String refreshToken;

    @Builder
    public TokensDto(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
