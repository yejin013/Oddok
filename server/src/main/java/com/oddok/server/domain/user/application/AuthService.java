package com.oddok.server.domain.user.application;

import com.oddok.server.common.errors.TokenValidFailedException;
import com.oddok.server.common.errors.UserNotFoundException;
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

    @Transactional
    public TokenDto refresh(Long userId, String refreshToken) {
        User user = findUser(userId);
        if(!refreshToken.equals(user.getRefreshToken()) || !authTokenProvider.isValidToken(refreshToken)) {
            throw new TokenValidFailedException();
        }
        AuthToken appToken = authTokenProvider.createUserAccessToken(user.getEmail());
        return TokenDto.builder()
                .token(appToken.getToken())
                .build();
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
    }
}
