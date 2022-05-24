package com.oddok.server.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class KakaoUserDto {
    private Long id;
    private Properties properties;
    private KakaoAccount kakaoAccount;

    @JsonCreator
    public KakaoUserDto(Long id, Properties properties, KakaoAccount kakaoAccount) {
        this.id = id;
        this.properties = properties;
        this.kakaoAccount = kakaoAccount;
    }

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
