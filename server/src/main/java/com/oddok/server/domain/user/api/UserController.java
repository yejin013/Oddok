package com.oddok.server.domain.user.api;

import com.oddok.server.domain.user.api.request.ChangeNicknameRequest;
import com.oddok.server.domain.user.api.response.AuthResponse;
import com.oddok.server.domain.user.api.response.ChangeNicknameResponse;
import com.oddok.server.domain.user.api.response.UpdateTokenResponse;
import com.oddok.server.domain.user.application.UserService;
import com.oddok.server.domain.user.dto.TokenDto;
import com.oddok.server.domain.user.mapper.UserDtoMapper;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    private final UserDtoMapper userDtoMapper = Mappers.getMapper(UserDtoMapper.class);

    @GetMapping("/refresh")
    public ResponseEntity<UpdateTokenResponse> refreshAccessToken(@RequestHeader String userId) {
        TokenDto tokenDto = userService.refresh(Long.parseLong(userId));
        return ResponseEntity.ok(userDtoMapper.toTokenResponse(tokenDto));
    }

    @GetMapping("/update-refresh-token")
    public ResponseEntity<?> updateRefreshToken(@RequestHeader String userId) {
        userService.updateRefreshToken(Long.parseLong(userId));
        return ResponseEntity.ok("refresh token 수정");
    }

    @PutMapping("/nickname")
    public ResponseEntity<ChangeNicknameResponse> changeNickname(@RequestHeader String userId,
                                         @RequestBody @Valid ChangeNicknameRequest changeNicknameRequest) {
        return ResponseEntity.ok(userDtoMapper.toChangeNicknameResponse(
                userService.changeNickname(Long.parseLong(userId), changeNicknameRequest.getNickname())));
    }
}
