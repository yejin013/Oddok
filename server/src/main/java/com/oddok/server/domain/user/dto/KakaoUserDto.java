package com.oddok.server.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class KakaoUserDto {
    private final Long id;
    private final Properties properties;
    private final KakaoAccount kakaoAccount;

    @JsonCreator
    public KakaoUserDto(
            @JsonProperty(value = "id") Long id,
            @JsonProperty(value = "properties") Properties properties,
            @JsonProperty(value = "kakao_account") KakaoAccount kakaoAccount) {
        this.id = id;
        this.properties = properties;
        this.kakaoAccount = kakaoAccount;
    }

    @Data
    @NoArgsConstructor
    public static class Properties {
        private String nickname;
    }

    @Data
    @NoArgsConstructor
    public static class KakaoAccount {
        private String email;
        private String gender;
    }

}
