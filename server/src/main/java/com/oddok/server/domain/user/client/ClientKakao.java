package com.oddok.server.domain.user.client;

import com.oddok.server.domain.user.dto.KakaoUserDto;
import com.oddok.server.domain.user.entity.Role;
import com.oddok.server.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
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
                .userId(userData.getId().toString())
                .nickname(userData.getProperties().getNickname())
                .role(Role.USER)
                .build();
    }

    public void leaveUser(Long userId) {
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("target_id_type", "user_id");
        formData.add("target_id", userId.toString());

        WebClient.create().post()
                .uri("https://kapi.kakao.com/v1/user/unlink")
                .accept(MediaType.APPLICATION_FORM_URLENCODED)
                .header("Authorization", "KakaoAK " + appAdminKey)
                .body(BodyInserters.fromFormData(formData))
                .retrieve()
                .bodyToMono(KakaoUserDto.class)
                .block();
    }

}
