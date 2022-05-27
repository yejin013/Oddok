package com.oddok.server.domain.user.application;

import com.oddok.server.common.jwt.AuthToken;
import com.oddok.server.common.jwt.AuthTokenProvider;
import com.oddok.server.domain.user.client.ClientKakao;
import com.oddok.server.domain.user.dao.UserRepository;
import com.oddok.server.domain.user.dto.TokenDto;
import com.oddok.server.domain.user.dto.TokensDto;
import com.oddok.server.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {

    private final UserRepository userRepository;

    private final ClientKakao clientKakao;
    private final AuthTokenProvider authTokenProvider;

    @Transactional
    public TokensDto login(String kakaoAccessToken) {
        User kakaoUser = clientKakao.getUserData(kakaoAccessToken);

        String userEmail = kakaoUser.getEmail();
        Optional<User> user = userRepository.findByEmail(userEmail);

        AuthToken accessToken = authTokenProvider.createUserAccessToken(userEmail);

        if (user.isEmpty()) {
            kakaoUser.updateRefreshToken(authTokenProvider.createUserRefreshToken(userEmail).getToken());
            userRepository.save(kakaoUser);
        } else {
            user.get().updateRefreshToken(authTokenProvider.createUserRefreshToken(userEmail).getToken());
        }

        return TokensDto.builder()
                .accessToken(accessToken.getToken())
                .refreshToken(kakaoUser.getRefreshToken())
                .build();
    }

}
