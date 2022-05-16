package com.oddok.server.domain.user.api;

import com.oddok.server.domain.user.api.response.AuthResponse;
import com.oddok.server.domain.user.application.AuthService;
import com.oddok.server.domain.user.dto.TokensDto;
import com.oddok.server.domain.user.mapper.AuthMapper;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final AuthMapper authMapper = Mappers.getMapper(AuthMapper.class);

    @PostMapping
    public ResponseEntity<AuthResponse> kakaoAuthRequest(@RequestParam("code") String code) {
        TokensDto tokensDto = authService.login(code);
        return ResponseEntity.ok(authMapper.toAuthResponse(tokensDto));
    }
}
