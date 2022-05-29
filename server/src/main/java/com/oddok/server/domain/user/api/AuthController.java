package com.oddok.server.domain.user.api;

import com.oddok.server.domain.user.api.request.RefreshTokenRequest;
import com.oddok.server.domain.user.api.response.AuthResponse;
import com.oddok.server.domain.user.api.response.UpdateTokenResponse;
import com.oddok.server.domain.user.application.AuthService;
import com.oddok.server.domain.user.dto.TokenDto;
import com.oddok.server.domain.user.dto.TokensDto;
import com.oddok.server.domain.user.mapper.AuthMapper;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final AuthMapper authMapper = Mappers.getMapper(AuthMapper.class);

    @GetMapping
    public ResponseEntity<AuthResponse> kakaoAuthRequest(@RequestParam("token") String kakaoAccessToken) {
        TokensDto tokensDto = authService.login(kakaoAccessToken);
        return ResponseEntity.ok(authMapper.toAuthResponse(tokensDto));
    }

    @PostMapping("/refresh")
    public ResponseEntity<UpdateTokenResponse> refreshAccessToken(@RequestHeader String userId,
                                                                  @RequestBody @Valid RefreshTokenRequest refreshTokenRequest) {
        TokenDto tokenDto = authService.refresh(Long.parseLong(userId), refreshTokenRequest.getRefreshToken());
        return ResponseEntity.ok(authMapper.toTokenResponse(tokenDto));
    }
}
