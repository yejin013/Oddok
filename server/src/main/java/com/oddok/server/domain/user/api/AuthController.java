package com.oddok.server.domain.user.api;

import com.oddok.server.domain.user.api.request.RefreshTokenRequest;
import com.oddok.server.domain.user.api.response.AuthResponse;
import com.oddok.server.domain.user.api.response.UpdateTokenResponse;
import com.oddok.server.domain.user.application.AuthService;
import com.oddok.server.domain.user.dto.TokenDto;
import com.oddok.server.domain.user.dto.TokensDto;
import com.oddok.server.domain.user.entity.User;
import com.oddok.server.domain.user.mapper.AuthMapper;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final AuthMapper authMapper = Mappers.getMapper(AuthMapper.class);

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

    @PostMapping("/refresh")
    public ResponseEntity<UpdateTokenResponse> refreshAccessToken(@AuthenticationPrincipal User user,
                                                                  @RequestBody @Valid RefreshTokenRequest refreshTokenRequest) {
        TokenDto tokenDto = authService.refresh(user, refreshTokenRequest.getRefreshToken());
        return ResponseEntity.ok(authMapper.toTokenResponse(tokenDto));
    }
}
