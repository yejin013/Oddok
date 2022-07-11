package com.oddok.server.domain.user.application;

import com.oddok.server.common.errors.TokenValidFailedException;
import com.oddok.server.common.errors.UserNotFoundException;
import com.oddok.server.common.jwt.JwtTokenProvider;
import com.oddok.server.domain.user.client.ClientKakao;
import com.oddok.server.domain.user.dao.UserRepository;
import com.oddok.server.domain.user.dto.TokenDto;
import com.oddok.server.domain.user.dto.TokensDto;
import com.oddok.server.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

        User user = userRepository.findByEmail(userEmail).orElseGet(() -> userRepository.save(kakaoUser));

        String accessToken = authTokenProvider.createAccessToken(user.getId().toString(), userEmail, user.getRole());

        user.updateRefreshToken(authTokenProvider.createRefreshToken(user.getId().toString(), userEmail, user.getRole()));

        return TokensDto.builder()
                .accessToken(accessToken)
                .refreshToken(user.getRefreshToken())
                .build();
    }

    @Transactional
    public TokenDto refresh(String refreshToken) {
        String refreshUserId = authTokenProvider.getUserId(authTokenProvider.getClaimsFromToken(refreshToken));

        User user = findUser(Long.parseLong(refreshUserId));

        String accessToken = authTokenProvider.createAccessToken(user.getId().toString(), user.getEmail(), user.getRole());

        return TokenDto.builder()
                .token(accessToken)
                .build();
    }

    @Transactional
    public void leave(User auth) {
        // kakao 연결 끊기 - kakaoId로 삭제
        clientKakao.leaveUser(auth.getId());

        // DB에서 회원 탈퇴
        User user = findUser(auth.getId());
        userRepository.delete(user);
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
    }
}
