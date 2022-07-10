package com.oddok.server.domain.user.api;

import com.oddok.server.domain.user.api.response.AuthResponse;
import com.oddok.server.domain.user.api.response.UpdateTokenResponse;
import com.oddok.server.domain.user.application.AuthService;
import com.oddok.server.domain.user.dto.TokenDto;
import com.oddok.server.domain.user.dto.TokensDto;
import com.oddok.server.domain.user.entity.User;
import com.oddok.server.domain.user.mapper.AuthMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.factory.Mappers;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;
    private final AuthMapper authMapper = Mappers.getMapper(AuthMapper.class);

    /**
     * [GET] 카카오 소셜 로그인
     * @param kakaoAccessToken
     * @param response
     * @return
     */
    @GetMapping
    public ResponseEntity<AuthResponse> kakaoAuthRequest(@RequestParam("token") String kakaoAccessToken, HttpServletResponse response) {
        TokensDto tokensDto = authService.login(kakaoAccessToken);
        ResponseCookie cookie = ResponseCookie.from("refreshToken", tokensDto.getRefreshToken())
                .maxAge(1209600000)
                .path("/")
                .secure(false)
                .httpOnly(true)
                .build();

        response.setHeader("Set-Cookie", cookie.toString());
        return ResponseEntity.ok(authMapper.toAuthResponse(tokensDto));
    }

    /**
     * [GET] accessToken을 cookie에 저장되어 있는 refreshToken으로 갱신
     * @param refreshTokenCookie
     * @return
     */
    @GetMapping("/refresh")
    public ResponseEntity<UpdateTokenResponse> refreshAccessToken(
            @CookieValue(value = "refreshToken", required = true) Cookie refreshTokenCookie) {
        TokenDto tokenDto = authService.refresh(refreshTokenCookie.getValue());
        return ResponseEntity.ok(authMapper.toTokenResponse(tokenDto));
    }

    @GetMapping("/logout")
    public ResponseEntity logout(@AuthenticationPrincipal User user) {
        authService.logout(user);
        return ResponseEntity.ok("로그아웃");
    }
}