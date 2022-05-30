package com.oddok.server.domain.user.application;

import com.oddok.server.common.errors.TokenValidFailedException;
import com.oddok.server.common.errors.UserNotFoundException;
import com.oddok.server.common.jwt.JwtTokenProvider;
import com.oddok.server.domain.user.client.ClientKakao;
import com.oddok.server.domain.user.dao.UserRepository;
import com.oddok.server.domain.user.dto.TokenDto;
import com.oddok.server.domain.user.dto.TokensDto;
import com.oddok.server.domain.user.entity.Role;
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
    private final JwtTokenProvider authTokenProvider;

    @Transactional
    public TokensDto login(String kakaoAccessToken) {
        User kakaoUser = clientKakao.getUserData(kakaoAccessToken);

        String userEmail = kakaoUser.getEmail();
        User user = userRepository.findByEmail(userEmail).orElse(
                userRepository.save(kakaoUser)
        );

        String accessToken = authTokenProvider.createAccessToken(userEmail, user.getRole());

        user.updateRefreshToken(authTokenProvider.createRefreshToken(userEmail, user.getRole()));

        return TokensDto.builder()
                .accessToken(accessToken)
                .refreshToken(user.getRefreshToken())
                .build();
    }

    @Transactional
    public TokenDto refresh(Long userId, String refreshToken) {
        User user = findUser(userId);
        String refreshUserEmail = authTokenProvider.getUserId(authTokenProvider.getClaimsFromToken(refreshToken));

        if(!refreshToken.equals(user.getRefreshToken()) || refreshUserEmail.equals(user.getEmail())) {
            throw new TokenValidFailedException();
        }

        String accessToken = authTokenProvider.createAccessToken(user.getEmail(), user.getRole());

        return TokenDto.builder()
                .token(accessToken)
                .build();
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
    }
}
