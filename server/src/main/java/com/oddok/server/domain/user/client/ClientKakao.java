package com.oddok.server.domain.user.client;

import com.oddok.server.domain.user.dto.KakaoUserDto;
import com.oddok.server.domain.user.entity.Role;
import com.oddok.server.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
public class ClientKakao {

    @Value("${spring.security.oauth2.client.provider.kakao.user-info-uri}")
    String userApi;

    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    String appAdminKey;

    public User getUserData(String kakaoAccessToken) {
        KakaoUserDto userData = WebClient.create().get()
                .uri(userApi)
                .accept(MediaType.APPLICATION_JSON)
                .headers(h -> h.setBearerAuth(kakaoAccessToken))
                .retrieve()
                .bodyToMono(KakaoUserDto.class)
                .block();

        return User.builder()
                .email(userData.getKakaoAccount().getEmail())
                .nickname(userData.getProperties().getNickname())
                .role(Role.USER)
                .build();
    }
//
//    public void leaveUser() {
//        WebClient.create().get()
//                .uri("https://kapi.kakao.com/v1/user/unlink")
//                .accept(MediaType.APPLICATION_JSON)
//                .headers(h -> h.setBearerAuth(kakaoAccessToken))
//                .retrieve()
//                .bodyToMono(KakaoUserDto.class)
//                .block();
//    }
//
//    public String getUserAccessToken() {
//
//    }
}
