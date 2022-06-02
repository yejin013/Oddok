package com.oddok.server.domain.user.api;

import com.oddok.server.domain.user.api.request.ChangeNicknameRequest;
import com.oddok.server.domain.user.api.request.RefreshTokenRequest;
import com.oddok.server.domain.user.api.response.ChangeNicknameResponse;
import com.oddok.server.domain.user.api.response.GetNicknameResponse;
import com.oddok.server.domain.user.api.response.GetUserResponse;
import com.oddok.server.domain.user.api.response.UpdateTokenResponse;
import com.oddok.server.domain.user.application.UserService;
import com.oddok.server.domain.user.dto.TokenDto;
import com.oddok.server.domain.user.dto.UserDto;
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

    @PostMapping("/refresh")
    public ResponseEntity<UpdateTokenResponse> refreshAccessToken(@RequestHeader String userId,
                                                                  @RequestBody @Valid RefreshTokenRequest refreshTokenRequest) {
        TokenDto tokenDto = userService.refresh(Long.parseLong(userId), refreshTokenRequest.getRefreshToken());
        return ResponseEntity.ok(userDtoMapper.toTokenResponse(tokenDto));
    }

    @PutMapping("/nickname")
    public ResponseEntity<ChangeNicknameResponse> changeNickname(@RequestHeader String userId,
                                                                 @RequestBody @Valid ChangeNicknameRequest changeNicknameRequest) {
        return ResponseEntity.ok(userDtoMapper.toChangeNicknameResponse(
                userService.changeNickname(Long.parseLong(userId), changeNicknameRequest.getNickname())));
    }

    @GetMapping("/nickname")
    public ResponseEntity<GetNicknameResponse> getNickname(@RequestHeader String userId) {
        return ResponseEntity.ok(userDtoMapper.toGetNicknameResponse(
                userService.getUserInfo(Long.parseLong(userId))));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetUserResponse> get(@PathVariable("id") Long id) {
        UserDto userInfo = userService.getUserInfo(id);
        return ResponseEntity.ok(userDtoMapper.toUserResponse(userInfo));
    }
}
