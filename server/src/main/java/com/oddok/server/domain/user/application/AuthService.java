package com.oddok.server.domain.user.application;

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

        String userId = kakaoUser.getUserId();

        User user = userRepository.findByUserId(userId).orElseGet(() -> userRepository.save(kakaoUser));

        String accessToken = authTokenProvider.createAccessToken(user.getId().toString(), userId, user.getRole());

        user.updateRefreshToken(authTokenProvider.createRefreshToken(user.getId().toString(), userId, user.getRole()));

        return TokensDto.builder()
                .accessToken(accessToken)
                .refreshToken(user.getRefreshToken())
                .build();
    }

    @Transactional
    public TokenDto refresh(String refreshToken) {
        String refreshUserId = authTokenProvider.getUserId(authTokenProvider.getClaimsFromToken(refreshToken));

        User user = findUser(Long.parseLong(refreshUserId));

        String accessToken = authTokenProvider.createAccessToken(user.getId().toString(), user.getUserId(), user.getRole());

        return TokenDto.builder()
                .token(accessToken)
                .build();
    }

    @Transactional
    public void leave(User auth) {
        // kakao 연결 끊기 - kakaoId로 삭제
        clientKakao.leaveUser(auth.getUserId());

        // DB에서 회원 탈퇴
        User user = findUser(auth.getId());
        userRepository.delete(user);
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
    }
}
