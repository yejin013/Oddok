package com.oddok.server.domain.user.api;

import com.oddok.server.domain.user.api.request.ChangeNicknameRequest;
import com.oddok.server.domain.user.api.response.ChangeNicknameResponse;
import com.oddok.server.domain.user.application.UserService;
import com.oddok.server.domain.user.dto.UserDto;
import com.oddok.server.domain.user.entity.User;
import com.oddok.server.domain.user.mapper.UserDtoMapper;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    private final UserDtoMapper userDtoMapper = Mappers.getMapper(UserDtoMapper.class);

    @PutMapping("/nickname")
    public ChangeNicknameResponse changeNickname(@RequestHeader String userId, @RequestBody @Valid ChangeNicknameRequest changeNicknameRequest) {
        UserDto request = userDtoMapper.fromChangeNicknameRequest(changeNicknameRequest);
        return userDtoMapper.toChangeNicknameResponse(userService.changeNickname(request, Long.parseLong(userId)));
    }
}
