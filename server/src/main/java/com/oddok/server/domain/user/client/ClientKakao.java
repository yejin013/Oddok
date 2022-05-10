package com.oddok.server.domain.user.client;

import com.oddok.server.domain.user.dto.KakaoUserDto;
import com.oddok.server.domain.user.entity.Role;
import com.oddok.server.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
public class ClientKakao {

    public User getUserData(String accessToken) {
        KakaoUserDto kakaoUserDto = WebClient.create().get()
                .uri("https://kapi.kakao.com/v2/user/me")
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(KakaoUserDto.class)
                .block();

        return User.builder()
                .email(kakaoUserDto.getKakaoAccount().getEmail())
                .nickname(kakaoUserDto.getProperties().getNickname())
                .role(Role.USER)
                .build();
    }
}
