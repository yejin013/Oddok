package com.oddok.server.domain.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
public class KakaoUserDto {
    private final Long id;
    private final Properties properties;
    private final KakaoAccount kakaoAccount;

    @ToString
    @Getter
    @Builder
    public static class Properties {
        private final String nickname;
    }

    @ToString
    @Getter
    @Builder
    public static class KakaoAccount {
        private final String email;
        private final String gender;
    }
}
