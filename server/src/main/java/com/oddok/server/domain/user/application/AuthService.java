package com.oddok.server.domain.user.application;

import com.oddok.server.common.jwt.AuthToken;
import com.oddok.server.common.jwt.AuthTokenProvider;
import com.oddok.server.domain.user.client.ClientKakao;
import com.oddok.server.domain.user.dao.UserRepository;
import com.oddok.server.domain.user.dto.TokenDto;
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
    public TokenDto login(TokenDto request) {
        User kakaoUser = clientKakao.getUserData(request.getToken());

        String userEmail = kakaoUser.getEmail();
        Optional<User> user = userRepository.findByEmail(userEmail);

        AuthToken appToken = authTokenProvider.createUserAppToken(userEmail);

        if (user.isEmpty()) {
            userRepository.save(kakaoUser);
        }

        return TokenDto.builder()
                .token(appToken.getToken())
                .build();
    }

}
