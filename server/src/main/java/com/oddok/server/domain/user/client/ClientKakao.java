package com.oddok.server.domain.user.client;

import com.oddok.server.common.errors.SocialDataNotFoundException;
import com.oddok.server.domain.user.dto.KakaoUserDto;
import com.oddok.server.domain.user.entity.Role;
import com.oddok.server.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
public class ClientKakao {

    public User getUserData(String kakaoAccessToken) {
        KakaoUserDto userData = WebClient.create().get()
                .uri("https://kapi.kakao.com/v2/user/me")
                .accept(MediaType.APPLICATION_JSON)
                .headers(h -> h.setBearerAuth(kakaoAccessToken))
                .retrieve()
                .bodyToMono(KakaoUserDto.class)
                .block();

        if (userData.getKakaoAccount().getEmail().isEmpty()) throw new SocialDataNotFoundException();

        return User.builder()
                .email(userData.getKakaoAccount().getEmail())
                .nickname(userData.getProperties().getNickname())
                .role(Role.USER)
                .build();
    }

}
